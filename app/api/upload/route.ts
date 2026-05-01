import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'banners');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `banner-${Date.now()}.${ext}`;
  const filepath = path.join(uploadDir, filename);

  const bytes = await file.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(bytes));

  // Return a public URL path
  const publicUrl = `/uploads/banners/${filename}`;
  return NextResponse.json({ url: publicUrl });
}
