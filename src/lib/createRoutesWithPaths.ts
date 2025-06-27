import type { JSX } from 'react';

type RouteConfig = {
  label: string;
  component: () => JSX.Element;
};

export function createRoutesWithPaths(routes: RouteConfig[]) {
  const usedSlugs = new Set<string>();

  return routes.map(({ label, component }) => {
    let slug = slugify(label);
    let counter = 1;

    while (usedSlugs.has(slug)) {
      slug = `${slug}-${counter}`;
      counter++;
    }

    usedSlugs.add(slug);

    return {
      label,
      path: `/${slug}`,
      component,
    };
  });
}

function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD') // Remove accents/diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritic marks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove repeated hyphens
}
