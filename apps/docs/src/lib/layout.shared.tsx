import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'PX-UI',
    },
    links: [
      {
        text: 'Components',
        url: '/docs/components/button',
      },
    ],
  };
}
