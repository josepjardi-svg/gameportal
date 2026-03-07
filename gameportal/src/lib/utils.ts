// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return views.toString();
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function truncate(text: string, length = 120): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

export const SITE_NAME = 'GameZone';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gamezone.example.com';
export const SITE_DESCRIPTION = 'El mejor portal de juegos HTML5 online. Juega gratis a miles de juegos en tu navegador sin descargas.';
