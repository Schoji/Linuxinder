import { Tag } from "./tag";

export type Distro = {
    slug: string,
    name: string,
    tagline: string,
    description: string,

    release_date: Date,
    originCountry: string,
    basedOn: string,
    screenshot_path: string,
    website: string,

    tags: Tag[],
    red_flag: string
}