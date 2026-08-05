import { Distro } from "./models/distro";
import { Tag } from "./models/tag";

export const distros: Distro[] = [
  {
    slug: "cachyos",
    name: "CachyOS",
    tagline: "Recompiled just for your CPU. Yes, that's flirting.",
    description:
      "German, Arch-born, and rebuilt from source for your exact instruction set. The BORE scheduler means I react the moment you touch me. Eighteen desktops on offer - I'll wear whatever you like.",
    release_date: new Date("2021-07-01"), // first images, July 2021 (exact day undocumented)
    originCountry: "Germany",
    basedOn: "Arch",
    logo_path: "/logos/cachyos.png",
    screenshot_path: "/screenshots/cachyos.png",
    website: "https://cachyos.org",
    tags: [Tag.Rolling, Tag.Gaming, Tag.Ricing],
  },
  {
    slug: "mint",
    name: "Linux Mint",
    tagline: "I will never surprise you. That's the whole point.",
    description:
      "Irish, Cinnamon-scented, sitting on an Ubuntu LTS base so nothing explodes at 2am. I won't make you relearn your own desktop. Boring? I prefer 'someone you'd bring home to your parents.'",
    release_date: new Date("2006-08-27"), // 1.0 "Ada"
    originCountry: "Ireland",
    basedOn: "Debian (Stable), Ubuntu (LTS)",
    logo_path: "/logos/mint.png",
    screenshot_path: "/screenshots/mint.png",
    website: "https://linuxmint.com",
    tags: [Tag.Stable, Tag.Beginner, Tag.Polished],
  },
  {
    slug: "mx",
    name: "MX Linux",
    tagline: "Old laptop? I've seen worse and I stayed.",
    description:
      "Greek-American lovechild of Debian and antiX. I'll run entirely from RAM if you ask nicely, and Xfce keeps me light enough to live on that ThinkPad you refuse to throw out. I don't judge.",
    release_date: new Date("2014-03-24"), // MX-14
    originCountry: "Greece, USA",
    basedOn: "Debian (Stable), antiX",
    logo_path: "/logos/mx.png",
    screenshot_path: "/screenshots/mx.png",
    website: "https://mxlinux.org",
    tags: [Tag.Stable, Tag.Lightweight, Tag.Beginner],
  },
  {
    slug: "popos",
    name: "Pop!_OS",
    tagline: "Auto-tiling. I arrange everything before you ask.",
    description:
      "System76 wrote me an entire desktop in Rust just to get my angles right. Tap Super and I'm already searching. My windows tile themselves - imagine what I'd do for the rest of your day.",
    release_date: new Date("2017-10-27"), // 17.10
    originCountry: "USA",
    basedOn: "Debian, Ubuntu (LTS)",
    logo_path: "/logos/popos.png",
    screenshot_path: "/screenshots/popos.png",
    website: "https://pop.system76.com",
    tags: [Tag.Stable, Tag.Gaming, Tag.Polished],
  },
  {
    slug: "debian",
    name: "Debian",
    tagline: "Half your exes were built on top of me.",
    description:
      "Global, independent, and around long before your favourite distro was born. I'll wear any of thirty-odd desktops for you. I even run on Hurd, which is my way of saying I'll try anything once.",
    release_date: new Date("1993-09-15"), // 0.01
    originCountry: "Global",
    basedOn: "Independent",
    logo_path: "/logos/debian.png",
    screenshot_path: "/screenshots/debian.png",
    website: "https://www.debian.org",
    tags: [Tag.Stable, Tag.Server, Tag.Diy],
  },
  {
    slug: "zorin",
    name: "Zorin OS",
    tagline: "I look like your ex. I treat you much better.",
    description:
      "Irish, GNOME underneath, dressed up like the Windows desktop you're finally walking out on. I'll even run your old .exe files without asking why you still need them. Rebounds can work out.",
    release_date: new Date("2009-07-01"), // 1.0
    originCountry: "Ireland",
    basedOn: "Debian, Ubuntu (LTS)",
    logo_path: "/logos/zorin.png",
    screenshot_path: "/screenshots/zorin.png",
    website: "https://zorin.com",
    tags: [Tag.Stable, Tag.Beginner, Tag.WindowsLike],
  },
  {
    slug: "fedora",
    name: "Fedora",
    tagline: "I'm into things you haven't heard of yet.",
    description:
      "Red Hat funds my habits, GNOME 50 is my current look, and I ship tech a year before anyone admits it's good. I come in spins for gaming, design, robotics. Yes, I have a type. It's you.",
    release_date: new Date("2003-11-06"), // Fedora Core 1
    originCountry: "USA",
    basedOn: "Independent",
    logo_path: "/logos/fedora.png",
    screenshot_path: "/screenshots/fedora.png",
    website: "https://fedoraproject.org",
    tags: [Tag.Corporate, Tag.Polished, Tag.Server],
  },
  {
    slug: "ubuntu",
    name: "Ubuntu",
    tagline: "My name literally means 'humanity to others'.",
    description:
      "Born out of Debian, registered on the Isle of Man, named after a word about giving you the shirt off my back. GNOME by day, Unity if you're feeling nostalgic. Everyone's first. Few people's last.",
    release_date: new Date("2004-10-20"), // 4.10 "Warty Warthog"
    originCountry: "Isle of Man",
    basedOn: "Debian",
    logo_path: "/logos/ubuntu.png",
    screenshot_path: "/screenshots/ubuntu.png",
    website: "https://ubuntu.com",
    tags: [Tag.Stable, Tag.Beginner, Tag.Corporate],
  },
  {
    slug: "endeavour",
    name: "EndeavourOS",
    tagline: "Arch, except I'll actually install myself for you.",
    description:
      "Dutch, Arch underneath, and named after the thing you keep promising you'll try. Calamares handles setup so you can skip the wiki at midnight. I'm the ghost of Antergos and I came back better.",
    release_date: new Date("2019-07-15"), // 19.6
    originCountry: "Netherlands",
    basedOn: "Arch",
    logo_path: "/logos/endeavour.png",
    screenshot_path: "/screenshots/endeavour.png",
    website: "https://endeavouros.com",
    tags: [Tag.Rolling, Tag.Diy, Tag.Ricing],
  },
  {
    slug: "bazzite",
    name: "Bazzite",
    tagline: "Take me to bed. Or the couch. Or the Steam Deck.",
    description:
      "My base is read-only and everything else lives in Flatpaks, so you genuinely cannot break me. People have tried. I ride along on the Steam Deck and whatever handheld you're hiding. Gaming is the personality.",
    release_date: new Date("2023-11-01"), // 1.0, November 2023 (exact day undocumented)
    originCountry: "Global",
    basedOn: "Fedora",
    logo_path: "/logos/bazzite.png",
    screenshot_path: "/screenshots/bazzite.png",
    website: "https://bazzite.gg",
    tags: [Tag.Immutable, Tag.Gaming, Tag.Polished],
  },
];
