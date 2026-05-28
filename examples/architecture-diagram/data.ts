import type { NestedGridNode } from 'react-nested-grid'

export const frontendNodes: NestedGridNode[] = [
  {
    id: 'client',
    title: 'Client Tier',
    children: [
      {
        id: 'channels',
        title: 'Delivery Channels',
        columns: 2,
        children: [
          {
            id: 'web',
            title: 'Web Frontend',
            children: [
              { id: 'portal', title: 'Customer Portal', content: 'Next.js · SSR' },
              { id: 'admin', title: 'Admin Panel', content: 'React · SPA' },
              { id: 'lib', title: 'Component Library', content: 'Storybook · Tailwind' },
            ],
          },
          {
            id: 'mobile',
            title: 'Mobile Apps',
            children: [
              { id: 'ios', title: 'iOS App', content: 'SwiftUI · Core Data' },
              { id: 'android', title: 'Android App', content: 'Jetpack Compose' },
            ],
          },
        ],
      },
    ],
  },
]

export const backendNodes: NestedGridNode[] = [
  {
    id: 'service',
    title: 'Service Tier',
    children: [
      { id: 'gateway', title: 'API Gateway', content: 'Kong · Rate Limiting · Auth' },
      {
        id: 'business',
        title: 'Business Services',
        columns: 2,
        children: [
          {
            id: 'core',
            title: 'Core',
            columns: 2,
            children: [
              { id: 'auth', title: 'Auth Service', content: 'JWT · OAuth2 · RBAC' },
              { id: 'user', title: 'User Service', content: 'Go · gRPC · PostgreSQL' },
            ],
          },
          {
            id: 'commerce',
            title: 'Commerce',
            children: [
              { id: 'order', title: 'Order Service', content: 'Node.js · MongoDB' },
              { id: 'payment', title: 'Payment', content: 'Stripe · PayPal' },
            ],
          },
        ],
      },
      {
        id: 'platform',
        title: 'Platform',
        columns: 3,
        children: [
          { id: 'notif', title: 'Notification', content: 'FCM · APNs' },
          { id: 'search', title: 'Search', span: 2, content: 'Elasticsearch' },
          { id: 'analytics', title: 'Analytics', span: 2, content: 'ClickHouse' },
          { id: 'logging', title: 'Logging', content: 'OpenTelemetry' },
        ],
      },
    ],
  },
]

export const infraNodes: NestedGridNode[] = [
  {
    id: 'data',
    title: 'Data & Infra',
    children: [
      { id: 'redis', title: 'Redis' },
      { id: 'mq', title: 'RabbitMQ' },
      { id: 's3', title: 'S3 Storage' },
    ],
  },
]
