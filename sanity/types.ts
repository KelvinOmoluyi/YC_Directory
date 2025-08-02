// types.ts

export type Slug = {
  _type: 'slug';
  current: string;
};

export type ImageAsset = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
  };
};

export type Markdown = string;

export type Author = {
  _id: string;
  _type: 'author';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
  };
  bio?: string;
};

export type Startup = {
  _id: string;
  _type: 'startup';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  author?: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: 'author';
  };
  views?: number;
  description?: string;
  category?: string;
  image?: string;
  pitch?: string;
};
