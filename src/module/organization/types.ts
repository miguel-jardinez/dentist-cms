export type Organization = {
  id: string;
  name: string;
  createdAt: Date;
  slug: string;
  metadata?: unknown;
  logo?: string | null | undefined;
};

export type Organizations = Array<Organization>;
