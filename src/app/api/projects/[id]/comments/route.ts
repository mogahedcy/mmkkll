
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// نموذج التحقق من بيانات التعليق
const CommentSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون على الأقل حرفين').max(100, 'الاسم طويل جداً'),
  email: z.string().email('البريد الإلكتروني غير صحيح').optional().or(z.literal('')),
  message: z.string().min(10, 'التعليق يجب أن يكون على الأقل 10 أحرف').max(1000, 'التعليق طويل جداً'),
  rating: z.number().min(1, 'التقييم يجب أن يكون بين 1 و 5').max(5, 'التقييم يجب أن يكون بين 1 و 5')
});

// GET - جلب التعليقات
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;

    // التحقق من وجود المشروع
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // جلب التعليقات
    const comments = await prisma.comment.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        message: true,
        rating: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      success: true,
      comments: comments.map(comment => ({
        ...comment,
        createdAt: comment.createdAt.toISOString()
      }))
    });

  } catch (error) {
    console.error('خطأ في جلب التعليقات:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب التعليقات' },
      { status: 500 }
    );
  }
}

// POST - إضافة تعليق جديد
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    const body = await request.json();

    // التحقق من صحة البيانات
    const validationResult = CommentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'بيانات غير صحيحة',
          details: validationResult.error.errors.map(err => err.message)
        },
        { status: 400 }
      );
    }

    const { name, email, message, rating } = validationResult.data;

    // التحقق من وجود المشروع
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // منع التعليقات المكررة من نفس الاسم في فترة قصيرة (10 دقائق)
    const recentComment = await prisma.comment.findFirst({
      where: {
        projectId,
        name: name.trim(),
        createdAt: {
          gte: new Date(Date.now() - 10 * 60 * 1000) // آخر 10 دقائق
        }
      }
    });

    if (recentComment) {
      return NextResponse.json(
        { error: 'لقد أضفت تعليقاً مؤخراً. يرجى الانتظار قبل إضافة تعليق آخر' },
        { status: 429 }
      );
    }

    // إضافة التعليق
    const newComment = await prisma.comment.create({
      data: {
        projectId,
        name: name.trim(),
        message: message.trim(),
        rating
      },
      select: {
        id: true,
        name: true,
        message: true,
        rating: true,
        createdAt: true
      }
    });

    // تحديث متوسط التقييم للمشروع
    const allComments = await prisma.comment.findMany({
      where: { projectId },
      select: { rating: true }
    });

    if (allComments.length > 0) {
      const averageRating = allComments.reduce((sum, comment) => sum + comment.rating, 0) / allComments.length;
      
      await prisma.project.update({
        where: { id: projectId },
        data: { rating: averageRating }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'تم إضافة التعليق بنجاح',
      comment: {
        ...newComment,
        createdAt: newComment.createdAt.toISOString()
      }
    }, { status: 201 });

  } catch (error) {
    console.error('خطأ في إضافة التعليق:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إضافة التعليق' },
      { status: 500 }
    );
  }
}
