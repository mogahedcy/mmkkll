import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - جلب جميع المشاريع
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');

    const skip = page ? (Number.parseInt(page) - 1) * (limit ? Number.parseInt(limit) : 12) : 0;
    const take = limit ? Number.parseInt(limit) : 12;

    const where: any = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    console.log('🔍 جلب المشاريع مع المعايير:', { where, skip, take });

    const projects = await prisma.project.findMany({
      where,
      include: {
        mediaItems: {
          orderBy: { order: 'asc' }
        },
        tags: true,
        materials: true,
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ],
      skip,
      take
    });

    console.log('📊 المشاريع المجلبة:', {
      count: projects.length,
      projects: projects.map(p => ({
        id: p.id,
        title: p.title,
        mediaCount: p.mediaItems.length,
        mediaTypes: p.mediaItems.map(m => m.type)
      }))
    });

    const totalCount = await prisma.project.count({ where });

    return NextResponse.json({
      projects,
      pagination: {
        total: totalCount,
        page: page ? Number.parseInt(page) : 1,
        limit: take,
        totalPages: Math.ceil(totalCount / take)
      }
    });

  } catch (error) {
    console.error('❌ خطأ في جلب المشاريع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب المشاريع' },
      { status: 500 }
    );
  }
}

// POST - إضافة مشروع جديد
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('🔍 البيانات المستلمة:', JSON.stringify(data, null, 2));

    const {
      title,
      description,
      category,
      location,
      completionDate,
      client,
      featured,
      projectDuration,
      projectCost,
      mediaItems,
      tags,
      materials
    } = data;

    console.log('🎥 عناصر الوسائط المستلمة:', mediaItems);

    // التحقق من صحة البيانات
    if (!title || !description || !category || !location) {
      return NextResponse.json(
        { error: 'البيانات الأساسية مطلوبة' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        category,
        location,
        completionDate: new Date(completionDate),
        client: client || null,
        featured: featured || false,
        projectDuration: projectDuration || '',
        projectCost: projectCost || '',
        mediaItems: {
          create: mediaItems?.map((item: any, index: number) => {
            console.log(`📁 معالجة ملف ${index + 1}:`, item);
            return {
              type: item.type,
              src: item.src,
              thumbnail: item.thumbnail,
              title: item.title,
              description: item.description,
              duration: item.duration,
              order: index
            };
          }) || []
        },
        tags: {
          create: tags?.map((tag: string) => ({ name: tag })) || []
        },
        materials: {
          create: materials?.map((material: string) => ({ name: material })) || []
        }
      },
      include: {
        mediaItems: true,
        tags: true,
        materials: true
      }
    });

    console.log('✅ تم إنشاء المشروع بنجاح:', {
      id: project.id,
      title: project.title,
      mediaCount: project.mediaItems.length,
      mediaItems: project.mediaItems
    });

    return NextResponse.json({
      success: true,
      project,
      message: 'تم إضافة المشروع بنجاح'
    });

  } catch (error) {
    console.error('❌ خطأ في إضافة المشروع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إضافة المشروع' },
      { status: 500 }
    );
  }
}
