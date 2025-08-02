import { defineQuery } from "next-sanity";

export const STARTUPS_QUERIES = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image
}`);

export const STARTUP_BY_ID_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0]{
    _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  pitch,
  image
}`);