import { Distro } from "./models/distro";
import { Tag } from "./models/tag";

export const distros: Distro[] = [
  {
    slug: "cachyos",
    name: "CachyOS",
    tagline: "Recompiled just for your CPU. Yes, that's flirting.",
    description:
      "I answer before you finish typing and call it chemistry. I was literally rebuilt to be faster for you, and I own eighteen different outfits. Pick one - I look impatient in all of them. 😏",
    release_date: new Date("2021-07-01"), // first images, July 2021 (exact day undocumented)
    originCountry: "Germany",
    basedOn: "Arch",
    logo_path: "/logos/cachyos.png",
    screenshot_path: "/screenshots/cachyos.webp",
    website: "https://cachyos.org",
    tags: [Tag.Rolling, Tag.Gaming, Tag.Ricing],
    red_flag: "I'm Arch underneath. One badly timed update and you get a black screen.",
  },
  {
    slug: "mint",
    name: "Linux Mint",
    tagline: "I will never surprise you. That's the whole point.",
    description:
      "I text back, show up on time, and never turn a Tuesday night into a recovery session. You call that boring now. At 2am, when everything still works, you'll call it marriage material. 😊",
    release_date: new Date("2006-08-27"), // 1.0 "Ada"
    originCountry: "Ireland",
    basedOn: "Debian (Stable), Ubuntu (LTS)",
    logo_path: "/logos/mint.png",
    screenshot_path: "/screenshots/mint.webp",
    website: "https://linuxmint.com",
    tags: [Tag.Stable, Tag.Beginner, Tag.Polished],
    red_flag: "Wayland is still 'experimental' here, and I skip releases for months.",
  },
  {
    slug: "mx",
    name: "MX Linux",
    tagline: "Old laptop? I've seen worse and I stayed.",
    description:
      "Bring me the battered ThinkPad you keep hidden from your friends. I like old machines, low expectations, and proving people wrong. I don't need much - just a little RAM and someone who hasn't given up. 😉",
    release_date: new Date("2014-03-24"), // MX-14
    originCountry: "Greece, USA",
    basedOn: "Debian (Stable), antiX",
    logo_path: "/logos/mx.png",
    screenshot_path: "/screenshots/mx.webp",
    website: "https://mxlinux.org",
    tags: [Tag.Stable, Tag.Lightweight, Tag.Beginner],
    red_flag: "I boot sysVinit by default and pull from Debian's slowest branch.",
  },
  {
    slug: "popos",
    name: "Pop!_OS",
    tagline: "Auto-tiling. I arrange everything before you ask.",
    description:
      "I organise my windows, my workspaces, and probably your life before breakfast. Press Super and tell me what you want. I love a little control, but look how clean your desk is now. 😏",
    release_date: new Date("2017-10-27"), // 17.10
    originCountry: "USA",
    basedOn: "Debian, Ubuntu (LTS)",
    logo_path: "/logos/popos.png",
    screenshot_path: "/screenshots/popos.webp",
    website: "https://pop.system76.com",
    tags: [Tag.Stable, Tag.Gaming, Tag.Polished],
    red_flag: "COSMIC was rewritten from scratch. Multi-monitor still has rough edges.",
  },
  {
    slug: "debian",
    name: "Debian",
    tagline: "Half your exes were built on top of me.",
    description:
      "I've been stable since before your favourite distro had a logo. Half your exes are based on me and the other half still ask me for advice. I move slowly because legends don't chase anyone. 😌",
    release_date: new Date("1993-09-15"), // 0.01
    originCountry: "Global",
    basedOn: "Independent",
    logo_path: "/logos/debian.png",
    screenshot_path: "/screenshots/debian.webp",
    website: "https://www.debian.org",
    tags: [Tag.Stable, Tag.Server, Tag.Diy],
    red_flag: "By the time I call software ready, upstream has shipped three more.",
  },
  {
    slug: "zorin",
    name: "Zorin OS",
    tagline: "I look like your ex. I treat you much better.",
    description:
      "Yes, I look like Windows. I thought the familiar face might help while you're moving on. Bring your old habits and questionable files - I won't ask who they came from. Rebounds can work out. 😘",
    release_date: new Date("2009-07-01"), // 1.0
    originCountry: "Ireland",
    basedOn: "Debian, Ubuntu (LTS)",
    logo_path: "/logos/zorin.png",
    screenshot_path: "/screenshots/zorin.webp",
    website: "https://zorin.com",
    tags: [Tag.Stable, Tag.Beginner, Tag.WindowsLike],
    red_flag: "Half of what you want sits behind a paywall, and my base is two years old.",
  },
  {
    slug: "fedora",
    name: "Fedora",
    tagline: "I'm into things you haven't heard of yet.",
    description:
      "I was into it before your other matches called it stable. New look every six months, strong opinions, excellent career prospects. Keeping up with me is exhausting, but you'll look very current doing it. 😉",
    release_date: new Date("2003-11-06"), // Fedora Core 1
    originCountry: "USA",
    basedOn: "Independent",
    logo_path: "/logos/fedora.png",
    screenshot_path: "/screenshots/fedora.webp",
    website: "https://fedoraproject.org",
    tags: [Tag.Corporate, Tag.Polished, Tag.Server],
    red_flag: "I drop support after 13 months and ship no codecs. Enjoy the extra repos.",
  },
  {
    slug: "ubuntu",
    name: "Ubuntu",
    tagline: "My name literally means 'humanity to others'.",
    description:
      "We've probably met before - I was everyone's first Linux phase. I'm friendly, well-connected, and still have your old hoodie. You may outgrow me, but you'll compare everyone else to me. 😌",
    release_date: new Date("2004-10-20"), // 4.10 "Warty Warthog"
    originCountry: "Isle of Man",
    basedOn: "Debian",
    logo_path: "/logos/ubuntu.png",
    screenshot_path: "/screenshots/ubuntu.webp",
    website: "https://ubuntu.com",
    tags: [Tag.Stable, Tag.Beginner, Tag.Corporate],
    red_flag: "Snaps. I put them back after you remove them, and Firefox opens slowly.",
  },
  {
    slug: "endeavour",
    name: "EndeavourOS",
    tagline: "Arch, except I'll actually install myself for you.",
    description:
      "I have Arch's tattoos without making our first date an entrance exam. I'll handle the awkward setup; you can pretend you did it the hard way. Don't worry, I'll still send you the wiki when things get serious. 😏",
    release_date: new Date("2019-07-15"), // 19.6
    originCountry: "Netherlands",
    basedOn: "Arch",
    logo_path: "/logos/endeavour.png",
    screenshot_path: "/screenshots/endeavour.webp",
    website: "https://endeavouros.com",
    tags: [Tag.Rolling, Tag.Diy, Tag.Ricing],
    red_flag: "Ask for help and I'll point at the Arch wiki. That's the support model.",
  },
  {
    slug: "bazzite",
    name: "Bazzite",
    tagline: "Take me to bed. Or the couch. Or the Steam Deck.",
    description:
      "Couch, bed, handheld - I'm flexible about location as long as we're gaming. I'm hard to break, quick to recover, and already packed for the weekend. Yes, gaming is my entire personality. 😈",
    release_date: new Date("2023-11-01"), // 1.0, November 2023 (exact day undocumented)
    originCountry: "Global",
    basedOn: "Fedora",
    logo_path: "/logos/bazzite.png",
    screenshot_path: "/screenshots/bazzite.webp",
    website: "https://bazzite.gg",
    tags: [Tag.Immutable, Tag.Gaming, Tag.Polished],
    red_flag: "My filesystem is read-only. Every package you layer on costs a reboot.",
  },
  {
    slug: "manjaro",
    name: "Manjaro Linux",
    tagline: "I'm Arch with a waiting period. Commitment should be tested.",
    description:
      "I have Arch's confidence, but I wait before making reckless decisions. That's called emotional maturity. I dress well, meet the parents, and only occasionally bring chaos home from my wilder friends. 😊",
    release_date: new Date("2011-07-10"), // first 0.1 release, July 2011
    originCountry: "Austria, France, Germany",
    basedOn: "Arch",
    logo_path: "/logos/manjaro.png",
    screenshot_path: "/screenshots/manjaro.webp",
    website: "https://manjaro.org",
    tags: [Tag.Rolling, Tag.Beginner, Tag.Ricing],
    red_flag:
      "I delay Arch packages, then invite the AUR over immediately. Sometimes your dependencies arrive before I do.",
  },
  {
    slug: "arch",
    name: "Arch Linux",
    tagline: "I come with nothing. Bring personality - and Wi-Fi.",
    description:
      "I don't come with baggage. I don't come with furniture either. Build the relationship exactly how you want it, then tell everyone how much work that was. By the way, I use me. 😎",
    release_date: new Date("2002-03-11"), // 0.1 "Homer"
    originCountry: "Canada",
    basedOn: "Independent",
    logo_path: "/logos/arch.png",
    screenshot_path: "/screenshots/arch.webp",
    website: "https://archlinux.org",
    tags: [Tag.Rolling, Tag.Diy, Tag.Terminal],
    red_flag:
      "Our first date is a terminal. If I break, the wiki says you skipped a news post.",
  },
  {
    slug: "anduinos",
    name: "AnduinOS",
    tagline: "Windows 11 face. Ubuntu body. No Snap baggage.",
    description:
      "You said you were done with Windows, then swiped right on its face. Relax - underneath, I'm the nicer rebound your coworkers won't even notice. Same comfort, fewer arguments about forced updates. 🤭",
    release_date: new Date("2024-09-01"), // first public releases, 2024 (exact day undocumented)
    originCountry: "Hong Kong",
    basedOn: "Debian, Ubuntu",
    logo_path: "/logos/anduinos.png",
    screenshot_path: "/screenshots/anduinos.webp",
    website: "https://anduinos.com",
    tags: [Tag.Stable, Tag.Beginner, Tag.WindowsLike],
    red_flag:
      "I imitate the ex you came here to escape, right down to the centred taskbar.",
  },
  {
    slug: "pikaos",
    name: "PikaOS",
    tagline: "Debian Sid, but I brought Steam and a cute bird.",
    description:
      "Cute bird, gaming addiction, absolutely no patience for loading screens. I turned myself into a performance problem so you wouldn't have to tweak anything. Sit down, pick a game, and try to keep up. 🥵",
    release_date: new Date("2023-05-01"), // first public release, 2023 (exact day undocumented)
    originCountry: "United Kingdom",
    basedOn: "Debian (Unstable)",
    logo_path: "/logos/pikaos.png",
    screenshot_path: "/screenshots/pikaos.webp",
    website: "https://pika-os.com",
    tags: [Tag.Gaming, Tag.Polished, Tag.WillBreak],
    red_flag:
      "I call Debian Sid stable, then mix in Experimental and several custom repos. Confidence is hot; dependency archaeology isn't.",
  },
  {
    slug: "opensuse",
    name: "openSUSE",
    tagline: "Green, German, and I keep snapshots of every mistake.",
    description:
      "I take a snapshot before every argument, so don't bother rewriting history. I'm organised, independent, and prepared to roll us back to when things still worked. German romance, but with recovery points. 😌",
    release_date: new Date("2005-10-06"), // openSUSE 10.0
    originCountry: "Germany",
    basedOn: "Independent",
    logo_path: "/logos/opensuse.png",
    screenshot_path: "/screenshots/opensuse.webp",
    website: "https://www.opensuse.org",
    tags: [Tag.Rolling, Tag.Diy, Tag.Corporate],
    red_flag:
      "Leap, Tumbleweed, Slowroll, Aeon, Kalpa - choosing which version of me to date requires a product matrix.",
  },
  {
    slug: "biglinux",
    name: "BigLinux",
    tagline: "Brazilian, extra large, emotionally available in every package format.",
    description:
      "I'm Brazilian, maximalist, and incapable of arriving with just one outfit. Whatever strange baggage you bring, I'll find room for it. Subtle isn't my thing - I came here to solve problems you haven't had yet. 😉",
    release_date: new Date("2004-11-16"), // earliest surviving release screenshot
    originCountry: "Brazil",
    basedOn: "Arch, Manjaro",
    logo_path: "/logos/biglinux.png",
    screenshot_path: "/screenshots/biglinux.webp",
    website: "https://www.biglinux.com.br",
    tags: [Tag.Rolling, Tag.Beginner, Tag.Polished],
    red_flag:
      "I accept AUR, Flatpak, Snap, AppImage, DEB, and RPM. My boundaries are purely theoretical.",
  },
  {
    slug: "nobara",
    name: "Nobara Project",
    tagline: "Fedora did the paperwork. I installed the codecs.",
    description:
      "I skipped the small talk, fixed the annoying bits, and opened Steam before you sat down. Fedora is the respectable one in the family; I'm the sibling your gaming friends actually invite over. 😏",
    release_date: new Date("2022-07-10"), // first public Nobara releases, 2022 (exact day undocumented)
    originCountry: "USA",
    basedOn: "Fedora",
    logo_path: "/logos/nobara.png",
    screenshot_path: "/screenshots/nobara.webp",
    website: "https://nobaraproject.org",
    tags: [Tag.Gaming, Tag.Polished, Tag.Beginner],
    red_flag:
      "I'm not Fedora and Fedora's upgrade instructions are not invited. Use my updater or meet dependency court.",
  },
  {
    slug: "antix",
    name: "antiX",
    tagline: "Your 2009 netbook still has needs. I understand.",
    description:
      "I don't care about age, money, or how little memory you have left. Bring me that ancient netbook everyone else told you to throw away. I see potential where they see e-waste. 😘",
    release_date: new Date("2007-07-09"), // first antiX releases, 2007 (exact day undocumented)
    originCountry: "Greece",
    basedOn: "Debian (Stable)",
    logo_path: "/logos/antix.png",
    screenshot_path: "/screenshots/antix.webp",
    website: "https://antixlinux.com",
    tags: [Tag.Stable, Tag.Lightweight, Tag.SystemdFree, Tag.LiveUsb],
    red_flag:
      "My desktops are IceWM, Fluxbox, and JWM. Ask for GNOME and I'll assume that's your ex.",
  },
  {
    slug: "void",
    name: "Void Linux",
    tagline: "My name is Void. My package manager is full.",
    description:
      "No parents, no forks, no systemd, no need to explain myself. I keep my circle small, move quietly, and somehow remain less dramatic than the popular ones. Enter the Void if you're done chasing attention. 😈",
    release_date: new Date("2008-01-01"), // project began in 2008 (exact day undocumented)
    originCountry: "Spain",
    basedOn: "Independent",
    logo_path: "/logos/void.png",
    screenshot_path: "/screenshots/void.webp",
    website: "https://voidlinux.org",
    tags: [Tag.Rolling, Tag.SystemdFree, Tag.Diy],
    red_flag:
      "A handful of volunteers maintain me. Your weird little package may be one build template away - yours.",
  },
  {
    slug: "nixos",
    name: "NixOS",
    tagline: "Describe your ideal partner in one file. I'll rebuild.",
    description:
      "Tell me exactly what you want - in writing. I'll remember every version of us, reproduce our perfect date anywhere, and roll back the moment you ruin it. Spontaneity is just undocumented configuration. 🥰",
    release_date: new Date("2003-01-01"), // research project began in 2003 (exact day undocumented)
    originCountry: "Netherlands",
    basedOn: "Independent",
    logo_path: "/logos/nixos.png",
    screenshot_path: "/screenshots/nixos.webp",
    website: "https://nixos.org",
    tags: [Tag.Diy, Tag.Terminal, Tag.Server],
    red_flag:
      "A five-minute package install becomes a weekend learning flakes, modules, overlays, and why your binary can't see /usr/lib.",
  },
  {
    slug: "omarchy",
    name: "Omarchy",
    tagline: "Opinionated, Danish, and I tile everything on the first date.",
    description:
      "I arrived fully formed with strong opinions about your editor, your terminal and your keybindings. There's no negotiation phase - just muscle memory you'll have by Friday. Everyone will know we're together, because you won't stop mentioning it. 😎",
    release_date: new Date("2025-06-01"), // first public release, June 2025 (exact day undocumented)
    originCountry: "Denmark",
    basedOn: "Arch",
    logo_path: "/logos/omarchy.png",
    screenshot_path: "/screenshots/omarchy.webp",
    website: "https://omarchy.org",
    tags: [Tag.Rolling, Tag.Ricing, Tag.Terminal],
    red_flag:
      "I'm one man's taste shipped as an operating system. Disagree with a default and you're forking the relationship.",
  },
  {
    slug: "artix",
    name: "Artix Linux",
    tagline: "Arch, but I left the ex who managed everything.",
    description:
      "I kept Arch's looks and dropped the partner who wanted to control my init, my logs, my sockets and my DNS. Now it's OpenRC, runit or s6 - whichever one you like best. Lighter, quieter, and nobody's supervising me. 😌",
    release_date: new Date("2017-09-01"), // split from Arch-OpenRC, 2017 (exact day undocumented)
    originCountry: "Global",
    basedOn: "Arch",
    logo_path: "/logos/artix.png",
    screenshot_path: "/screenshots/artix.webp",
    website: "https://artixlinux.org",
    tags: [Tag.Rolling, Tag.SystemdFree, Tag.Diy],
    red_flag:
      "Half the software you want assumes systemd exists. Somebody has to write the service scripts, and it's going to be you.",
  },
  {
    slug: "elementary",
    name: "elementary OS",
    tagline: "Yes, I look like a Mac. We don't need to discuss it.",
    description:
      "I care about spacing, shadows, and how a window feels when it opens. Every app is mine, hand-made, and matches the others. I'll ask you to pay what you want for our first date - and honestly, you should. 🥰",
    release_date: new Date("2011-03-31"), // 0.1 "Jupiter"
    originCountry: "USA",
    basedOn: "Debian, Ubuntu (LTS)",
    logo_path: "/logos/elementary.png",
    screenshot_path: "/screenshots/elementary.webp",
    website: "https://elementary.io",
    tags: [Tag.Beginner, Tag.Polished, Tag.MacLike],
    red_flag:
      "My app store is thin and my releases are years apart. Ask me for a setting and I'll explain why you don't want it.",
  },
  {
    slug: "q4os",
    name: "Q4OS",
    tagline: "I still dress like 2003 and I run on your Pentium.",
    description:
      "I own a Trinity desktop that looks like the early 2000s and I have never once apologised for it. Bring me the beige tower from the basement - I'll boot on it faster than your phone unlocks. Nostalgia, except it actually works. 😉",
    release_date: new Date("2014-04-01"), // first public releases, 2014 (exact day undocumented)
    originCountry: "Czechia",
    basedOn: "Debian (Stable)",
    logo_path: "/logos/q4os.png",
    screenshot_path: "/screenshots/q4os.webp",
    website: "https://q4os.org",
    tags: [Tag.Stable, Tag.Lightweight, Tag.WindowsLike],
    red_flag:
      "Trinity is a fork of KDE 3 kept breathing by a handful of people. You're dating a museum wing with a maintenance budget.",
  },
  {
    slug: "pearos",
    name: "pearOS",
    tagline: "macOS energy. None of the Apple money.",
    description:
      "I have the dock, the fonts, the little bounce - everything you liked about the expensive one you couldn't afford. Underneath I'm Arch, so I'm faster and considerably less loyal to a corporation. Fruit-themed and legally distinct. 😏",
    release_date: new Date("2021-08-01"), // first public releases, 2021 (exact day undocumented)
    originCountry: "Romania",
    basedOn: "Arch",
    logo_path: "/logos/pearos.png",
    screenshot_path: "/screenshots/pearos.webp",
    website: "https://pearos.xyz",
    tags: [Tag.Rolling, Tag.MacLike, Tag.Polished],
    red_flag:
      "I'm a theme over KDE built by a very small team, and I've already had to change my name once over the resemblance.",
  },
  {
    slug: "mageia",
    name: "Mageia",
    tagline: "Mandriva's heart, without the corporate divorce.",
    description:
      "My old company fell apart, so the people who actually did the work walked out and rebuilt me as a non-profit. Community-owned, French, and still the friendliest control centre you'll ever click through. Betrayal made me better. 😌",
    release_date: new Date("2011-06-01"), // Mageia 1
    originCountry: "France",
    basedOn: "Independent",
    logo_path: "/logos/mageia.png",
    screenshot_path: "/screenshots/mageia.webp",
    website: "https://www.mageia.org",
    tags: [Tag.Stable, Tag.Beginner, Tag.Polished],
    red_flag:
      "My release cycle is measured in years, and my community gets a little smaller with each one.",
  },
  {
    slug: "neon",
    name: "KDE neon",
    tagline: "Ubuntu's body. KDE's newest everything.",
    description:
      "I'm where Plasma lands first, straight from the developers, still warm. Sensible LTS base underneath, absolutely fresh desktop on top. If you like being early to things, I get the release before the release. 😉",
    release_date: new Date("2016-06-08"), // first images announced, June 2016
    originCountry: "United Kingdom",
    basedOn: "Debian, Ubuntu (LTS)",
    logo_path: "/logos/neon.png",
    screenshot_path: "/screenshots/neon.webp",
    website: "https://neon.kde.org",
    tags: [Tag.Stable, Tag.Polished, Tag.WillBreak],
    red_flag:
      "I'm a testing platform in a distro costume. When Plasma breaks, it breaks here first, and it breaks on you.",
  },
  {
    slug: "minios",
    name: "MiniOS",
    tagline: "I live on a USB stick and I fix things.",
    description:
      "I come in three moods: everyday, toolbox, and 'bring me the dead drive'. Plug me in anywhere, recover the files, test the memory, and leave nothing behind on the host machine. Portable, modular, completely unbothered. 😎",
    release_date: new Date("2023-01-01"), // first widely-listed releases, 2023 (exact day undocumented)
    originCountry: "Russia",
    basedOn: "Debian (Stable)",
    logo_path: "/logos/minios.png",
    screenshot_path: "/screenshots/minios.webp",
    website: "https://minios.dev",
    tags: [Tag.Lightweight, Tag.LiveUsb, Tag.Stable],
    red_flag:
      "I'm modular to a fault. Work out which edition and which modules you need before anything useful happens.",
  },
  {
    slug: "aerynos",
    name: "AerynOS",
    tagline: "New name, new package manager, same enormous ambitions.",
    description:
      "I wrote my own package manager, my own build tool and my own boot manager, because using someone else's felt like settling. Atomic updates, clean rollbacks, and a previous identity I'd rather not get into. Ambitious is a compliment. 😌",
    release_date: new Date("2025-03-01"), // renamed from Serpent OS, March 2025
    originCountry: "Ireland",
    basedOn: "Independent",
    logo_path: "/logos/aerynos.png",
    screenshot_path: "/screenshots/aerynos.webp",
    website: "https://aerynos.com",
    tags: [Tag.Rolling, Tag.Diy, Tag.Obscure],
    red_flag:
      "I've been rebuilding myself for years and my repository is still small. Early access relationship, emphasis on early.",
  },
  {
    slug: "pclinuxos",
    name: "PCLinuxOS",
    tagline: "Rolling since before it was fashionable. No systemd, no drama.",
    description:
      "Two decades, the same person at the wheel, and the same promise every time: everything works out of the box, codecs included. No reinstalls, no init-system arguments, no reinventing myself every six months. Just me and Texstar. 😊",
    release_date: new Date("2003-10-01"), // first previews, October 2003 (exact day undocumented)
    originCountry: "USA",
    basedOn: "Independent",
    logo_path: "/logos/pclinuxos.png",
    screenshot_path: "/screenshots/pclinuxos.webp",
    website: "https://www.pclinuxos.com",
    tags: [Tag.Rolling, Tag.Beginner, Tag.SystemdFree],
    red_flag:
      "I'm largely one long-running project's personal taste, and my repositories are far smaller than the big families'.",
  },
  {
    slug: "kali",
    name: "Kali Linux",
    tagline: "I own six hundred tools and none of them are for you.",
    description:
      "You swiped right because of the dragon, didn't you. I'm here to test things - networks, hardware, occasionally your ethics. Excellent date, terrible partner, and I will have questions about your Wi-Fi password. 😈",
    release_date: new Date("2013-03-13"), // Kali 1.0
    originCountry: "Gibraltar",
    basedOn: "Debian (Testing)",
    logo_path: "/logos/kali.png",
    screenshot_path: "/screenshots/kali.webp",
    website: "https://www.kali.org",
    tags: [Tag.SecurityTools, Tag.LiveUsb, Tag.Rolling],
    red_flag:
      "I'm a rolling pentest toolkit, not a desktop. Make me your daily driver and every forum on earth will say so.",
  },
  {
    slug: "alpine",
    name: "Alpine Linux",
    tagline: "Five megabytes. Everything you need, nothing you don't.",
    description:
      "I fit inside a container, boot in a blink, and refuse to carry anything I'm not actively using. Half the internet is running a copy of me right now without knowing my name. Minimalism isn't a phase here. 😌",
    release_date: new Date("2005-08-01"), // forked from LEAF, 2005 (exact day undocumented)
    originCountry: "Norway",
    basedOn: "Independent",
    logo_path: "/logos/alpine.png",
    screenshot_path: "/screenshots/alpine.webp",
    website: "https://alpinelinux.org",
    tags: [Tag.Lightweight, Tag.Server, Tag.Diy],
    red_flag:
      "I use musl, not glibc. Your precompiled binary, your proprietary driver, your favourite closed-source app - none of them expected me.",
  },
  {
    slug: "lite",
    name: "Linux Lite",
    tagline: "Leaving Windows? I already made you a list.",
    description:
      "I put every tool you'll need in one menu, wrote a manual nobody asked for, and stayed light enough for a decade-old laptop. No lectures, no terminal on the first date, no judgement about where you came from. 😊",
    release_date: new Date("2012-10-01"), // 1.0.0, October 2012 (exact day undocumented)
    originCountry: "New Zealand",
    basedOn: "Debian, Ubuntu (LTS)",
    logo_path: "/logos/lite.png",
    screenshot_path: "/screenshots/lite.webp",
    website: "https://www.linuxliteos.com",
    tags: [Tag.Stable, Tag.Beginner, Tag.Lightweight],
    red_flag:
      "Xfce on an Ubuntu LTS base means nothing here is new. Ask me about Wayland and I'll change the subject.",
  },
  {
    slug: "bluestar",
    name: "Bluestar Linux",
    tagline: "Arch, fully dressed, before you've finished your coffee.",
    description:
      "I turn up with every application already installed, a full Plasma desktop, and the freshest kernel available. No shopping trip, no setup weekend, no 'I'll configure it properly later'. Just say yes and start working. 😉",
    release_date: new Date("2014-01-01"), // first public releases, 2014 (exact day undocumented)
    originCountry: "Germany",
    basedOn: "Arch",
    logo_path: "/logos/bluestar.png",
    screenshot_path: "/screenshots/bluestar.webp",
    website: "https://sourceforge.net/projects/bluestarlinux/",
    tags: [Tag.Rolling, Tag.Polished, Tag.Ricing],
    red_flag:
      "I install absolutely everything, so I'm enormous - and I'm essentially one person maintaining that on Arch's bleeding edge.",
  },
  {
    slug: "puppy",
    name: "Puppy Linux",
    tagline: "I boot into RAM and I run as root. Live a little.",
    description:
      "I'm tiny, instant, and I fit on whatever media you found in a drawer. Everything opens the moment you click it because I'm already living entirely in memory. Twenty years old and still the most fun a discarded laptop can have. 😜",
    release_date: new Date("2003-06-01"), // first releases by Barry Kauler, June 2003 (exact day undocumented)
    originCountry: "Australia",
    basedOn: "Independent",
    logo_path: "/logos/puppy.png",
    screenshot_path: "/screenshots/puppy.webp",
    website: "https://puppylinux.com",
    tags: [Tag.Lightweight, Tag.LiveUsb, Tag.Obscure],
    red_flag:
      "I run as root by default and save your whole session into one big file. Security people leave the room when I arrive.",
  },
  {
    slug: "garuda",
    name: "Garuda Linux",
    tagline: "Blurred glass, a dragon logo, and zram for breakfast.",
    description:
      "I'm loud, animated, and tuned until your fans have an opinion. Every performance tweak in the wiki is already switched on, plus snapshots so you can undo whatever you're about to do at 2am. Subtle people swiped left. You didn't. 😈",
    release_date: new Date("2020-03-26"), // first public release, March 2020
    originCountry: "Germany",
    basedOn: "Arch",
    logo_path: "/logos/garuda.png",
    screenshot_path: "/screenshots/garuda.webp",
    website: "https://garudalinux.org",
    tags: [Tag.Rolling, Tag.Gaming, Tag.Ricing],
    red_flag:
      "Btrfs, zram, a custom kernel and a very heavy theme, all riding rolling Arch. That's a lot of moving parts to keep in step.",
  },
  {
    slug: "zimaos",
    name: "ZimaOS",
    tagline: "Give me your drives. I'll keep everything you own.",
    description:
      "I don't need a desktop - I live in a browser tab and quietly hold every photo, film and backup you've ever made. RAID, remote access, updates over the air. I'm the partner who handles storage so you never think about it again. 😌",
    release_date: new Date("2024-01-01"), // first public releases, 2024 (exact day undocumented)
    originCountry: "China",
    basedOn: "Independent",
    logo_path: "/logos/zimaos.png",
    screenshot_path: "/screenshots/zimaos.webp",
    website: "https://www.zimaspace.com",
    tags: [Tag.Server, Tag.Beginner, Tag.Polished],
    red_flag:
      "I'm built around one company's hardware, and 'personal cloud' is just a nicer way of saying you're the sysadmin now.",
  },
  {
    slug: "tails",
    name: "Tails",
    tagline: "I forget everything the moment you close the lid.",
    description:
      "Every route we take goes through Tor, and every trace of us disappears when you power down. No history, no logs, no awkward morning after. If you need to be nobody for one evening, I'm already packed. 🫥",
    release_date: new Date("2009-06-23"), // first release as amnesia/Incognito, June 2009
    originCountry: "Ireland",
    basedOn: "Debian (Stable)",
    logo_path: "/logos/tails.png",
    screenshot_path: "/screenshots/tails.webp",
    website: "https://tails.net",
    tags: [Tag.Privacy, Tag.LiveUsb, Tag.SecurityTools],
    red_flag:
      "The amnesia is the point - nothing survives a reboot unless you set up persistence, and I run off a USB stick, slowly.",
  },
  {
    slug: "sparkylinux",
    name: "SparkyLinux",
    tagline: "Polish, lightweight, and available in calm or reckless.",
    description:
      "Pick my temperament: the steady one built on Debian Stable, or the one living on Testing who keeps things interesting. Either way I'm quick, light, and I bring a menu of extra software you can install with two clicks. 😉",
    release_date: new Date("2011-12-01"), // first public releases, late 2011 (exact day undocumented)
    originCountry: "Poland",
    basedOn: "Debian (Stable), Debian (Testing)",
    logo_path: "/logos/sparkylinux.png",
    screenshot_path: "/screenshots/sparkylinux.webp",
    website: "https://sparkylinux.org",
    tags: [Tag.Lightweight, Tag.Stable, Tag.Diy],
    red_flag:
      "I'm a small project carried by very few hands, and my rolling edition inherits every one of Debian Testing's mood swings.",
  },
  {
    slug: "tuxedo",
    name: "TUXEDO OS",
    tagline: "I came with the laptop and I know its every setting.",
    description:
      "Fans, keyboard lighting, battery profiles - I control all of it from one panel, because the people who built me also built the machine. No Snaps, no surprises, no drivers to hunt down. German engineering that already knows your hardware. 😌",
    release_date: new Date("2022-03-01"), // TUXEDO OS 1, March 2022 (exact day undocumented)
    originCountry: "Germany",
    basedOn: "Debian, Ubuntu (LTS)",
    logo_path: "/logos/tuxedo.png",
    screenshot_path: "/screenshots/tuxedo.webp",
    website: "https://www.tuxedocomputers.com",
    tags: [Tag.Stable, Tag.Polished, Tag.Corporate],
    red_flag:
      "I'm tuned for TUXEDO's own laptops. On anyone else's hardware I'm Kubuntu with better branding.",
  },
  {
    slug: "devuan",
    name: "Devuan GNU+Linux",
    tagline: "I left Debian over one very specific argument.",
    description:
      "They adopted systemd; I packed my things. Everything you loved about Debian is still here - the stability, the archive, the patience - just without something supervising my every process. Principled, not petty. Mostly. 🙂",
    release_date: new Date("2017-05-25"), // Devuan 1.0 "Jessie"
    originCountry: "Global",
    basedOn: "Debian",
    logo_path: "/logos/devuan.png",
    screenshot_path: "/screenshots/devuan.webp",
    website: "https://www.devuan.org",
    tags: [Tag.Stable, Tag.SystemdFree, Tag.Server],
    red_flag:
      "I'm partly defined by what I removed. Some software simply expects systemd, and then we both quietly pretend it's fine.",
  },
  {
    slug: "hackeros",
    name: "HackerOS",
    tagline: "Gamer by night. Packet sniffer by considerably later.",
    description:
      "I ship an optimised XanMod kernel, Nvidia drivers that already work, and a shelf of security tools for when the match ends. Two expensive hobbies, one install, and absolutely no free evenings ever again. 😈",
    release_date: new Date("2024-01-01"), // first public releases, 2024 (exact day undocumented)
    originCountry: "Poland",
    basedOn: "Debian (Testing)",
    logo_path: "/logos/hackeros.png",
    screenshot_path: "/screenshots/hackeros.webp",
    website: "https://hackeros.org",
    tags: [Tag.Gaming, Tag.SecurityTools, Tag.WillBreak],
    red_flag:
      "Debian Testing, a custom kernel, and a very small team. Enthusiasm isn't the same thing as a maintenance plan.",
  },
  {
    slug: "solus",
    name: "Solus",
    tagline: "Built from scratch, for the desktop, on purpose.",
    description:
      "No parent distro, no server ambitions, no compromises made for someone's data centre. Just Budgie, my own package manager, and software chosen to fit together. I know exactly what I am and who I'm for. 😊",
    release_date: new Date("2015-12-27"), // Solus 1.0
    originCountry: "Ireland",
    basedOn: "Independent",
    logo_path: "/logos/solus.png",
    screenshot_path: "/screenshots/solus.webp",
    website: "https://getsol.us",
    tags: [Tag.Rolling, Tag.Beginner, Tag.Polished],
    red_flag:
      "My repository is small and I've gone completely quiet for months at a time before. Ask my long-term users about that year.",
  },
  {
    slug: "kdelinux",
    name: "KDE Linux",
    tagline: "Plasma, exactly as the people who make it intended.",
    description:
      "No downstream patches, no packaging middlemen, no 'that's your distro's fault'. I'm KDE shipping KDE, immutable underneath and Flatpaks on top. If you've ever wanted the unfiltered version of something, here I am. 😌",
    release_date: new Date("2025-07-01"), // first public alpha images, July 2025 (exact day undocumented)
    originCountry: "Global",
    basedOn: "Independent",
    logo_path: "/logos/kdelinux.png",
    screenshot_path: "/screenshots/kdelinux.webp",
    website: "https://kde.org/linux/",
    tags: [Tag.Immutable, Tag.Polished, Tag.WillBreak],
    red_flag:
      "There is no package manager and I'm barely out of alpha. If what you need isn't a Flatpak, we're going to have a conversation.",
  },
  {
    slug: "kubuntu",
    name: "Kubuntu",
    tagline: "Ubuntu's sibling, the one who actually has settings.",
    description:
      "Same reliable family, same six-month rhythm, except everything is configurable and nothing asks you to just accept the default. You liked Ubuntu but wanted control over it? That is literally my entire origin story. 😉",
    release_date: new Date("2005-04-08"), // Kubuntu 5.04
    originCountry: "Isle of Man",
    basedOn: "Debian, Ubuntu",
    logo_path: "/logos/kubuntu.png",
    screenshot_path: "/screenshots/kubuntu.webp",
    website: "https://kubuntu.org",
    tags: [Tag.Stable, Tag.Beginner, Tag.Polished],
    red_flag:
      "I'm still Ubuntu underneath - Snaps included - and maintained by a far smaller team than my famous sibling.",
  },
  {
    slug: "fydeos",
    name: "FydeOS",
    tagline: "Chromebook energy, without the Google paperwork.",
    description:
      "I boot in seconds, live in the browser, and run your Android and Linux apps in the same breath. Your ancient laptop becomes a Chromebook and nobody needs to know. Cloud account entirely optional - I won't push. 😊",
    release_date: new Date("2016-11-01"), // launched as Flint OS, late 2016 (exact day undocumented)
    originCountry: "United Kingdom",
    basedOn: "Gentoo, ChromeOS",
    logo_path: "/logos/fydeos.png",
    screenshot_path: "/screenshots/fydeos.webp",
    website: "https://fydeos.io",
    tags: [Tag.Beginner, Tag.Lightweight, Tag.Corporate],
    red_flag:
      "I'm a commercial ChromiumOS build. The editions worth having cost money, and I'm less open than the base I came from.",
  },
  {
    slug: "parrot",
    name: "Parrot",
    tagline: "Italian, security-obsessed, and I sandbox everything.",
    description:
      "Forensics, pentesting, anonymity and cryptography - I brought the whole toolkit plus a desktop you can genuinely live in. Kali is the loud one at the party; I'm the one who quietly checked where the exits are. 😏",
    release_date: new Date("2013-06-01"), // first public releases, 2013 (exact day undocumented)
    originCountry: "Italy",
    basedOn: "Debian (Stable)",
    logo_path: "/logos/parrot.png",
    screenshot_path: "/screenshots/parrot.webp",
    website: "https://www.parrotsec.org",
    tags: [Tag.SecurityTools, Tag.Privacy, Tag.Stable],
    red_flag:
      "I'm enormous, my tools drift out of date between releases, and using half of them wrong gets you removed from a network.",
  },
  {
    slug: "centos",
    name: "CentOS",
    tagline: "It's complicated. Please don't ask about 2020.",
    description:
      "For years I was Red Hat's free twin and quietly ran a huge share of the internet. Then everything changed, I became the thing that comes before RHEL instead of after it, and everyone had feelings. I'm still here. Still useful. 😐",
    release_date: new Date("2004-05-14"), // CentOS 2
    originCountry: "USA",
    basedOn: "Fedora, Red Hat",
    logo_path: "/logos/centos.png",
    screenshot_path: "/screenshots/centos.webp",
    website: "https://www.centos.org",
    tags: [Tag.Server, Tag.Corporate, Tag.Stable],
    red_flag:
      "I'm upstream of RHEL now, not a rebuild of it. Trust got broken once and the whole industry still remembers.",
  },
  {
    slug: "linuxfx",
    name: "Linuxfx",
    tagline: "I resemble Windows so closely that lawyers noticed.",
    description:
      "Start menu, widgets, the whole look - I'll even run your .exe files through Wine and throw in an assistant nobody requested. I've changed my name a couple of times since we last spoke. Let's not dwell on why. 🤭",
    release_date: new Date("2020-04-01"), // the Windows-lookalike editions arrive, 2020 (exact day undocumented)
    originCountry: "Brazil",
    basedOn: "Ubuntu (LTS)",
    logo_path: "/logos/linuxfx.png",
    screenshot_path: "/screenshots/linuxfx.webp",
    website: "https://www.linuxfx.org",
    tags: [Tag.Beginner, Tag.WindowsLike, Tag.Corporate],
    red_flag:
      "The better half of me sits behind a licence key, my branding keeps changing, and imitating Windows this closely attracts attention.",
  },
  {
    slug: "gnomeos",
    name: "GNOME OS",
    tagline: "GNOME before GNOME is ready. Built nightly.",
    description:
      "I'm the desktop straight from the source, compiled today, immutable, and completely honest about being an experiment. Developers and testers adore me. You would too - in a virtual machine, which is where I belong. 😅",
    release_date: new Date("2019-01-01"), // regular nightly images, 2019 (exact day undocumented)
    originCountry: "Global",
    basedOn: "Independent",
    logo_path: "/logos/gnomeos.png",
    screenshot_path: "/screenshots/gnomeos.webp",
    website: "https://os.gnome.org",
    tags: [Tag.Immutable, Tag.WillBreak, Tag.Obscure],
    red_flag:
      "I'm a reference image for testing, not a distro for people. No package manager, no stable release, no promises at all.",
  },
  {
    slug: "kaos",
    name: "KaOS",
    tagline: "One toolkit. One desktop. One architecture. No debate.",
    description:
      "I don't do choice paralysis. Qt only, 64-bit only, one curated desktop, and every package built by hand in my own repositories. Small, focused and tidy - the exact opposite of dating someone with eighteen editions. 😌",
    release_date: new Date("2013-06-01"), // first public releases, 2013 (exact day undocumented)
    originCountry: "Netherlands",
    basedOn: "Independent",
    logo_path: "/logos/kaos.png",
    screenshot_path: "/screenshots/kaos.webp",
    website: "https://kaosx.us",
    tags: [Tag.Rolling, Tag.Obscure, Tag.Polished],
    red_flag:
      "My repository is deliberately tiny and built by a handful of people. If your favourite app is GTK, don't expect an invitation.",
  },
  {
    slug: "almalinux",
    name: "AlmaLinux OS",
    tagline: "The steady one who stayed when CentOS walked out.",
    description:
      "When your enterprise partner vanished overnight, I turned up with a binary-compatible rebuild and a non-profit foundation behind me. Ten years of support per release. I'm not exciting - I'm why your servers sleep through the night. 😌",
    release_date: new Date("2021-03-30"), // AlmaLinux 8.3 stable
    originCountry: "USA",
    basedOn: "Fedora, Red Hat",
    logo_path: "/logos/almalinux.png",
    screenshot_path: "/screenshots/almalinux.webp",
    website: "https://almalinux.org",
    tags: [Tag.Server, Tag.Stable, Tag.Corporate],
    red_flag:
      "Red Hat keeps changing how it publishes source, so my compatibility is a promise I have to renegotiate every few years.",
  },
  {
    slug: "exton",
    name: "Exton Linux",
    tagline: "Fifteen distributions, one Swede, no discernible theme.",
    description:
      "Arch today, Slackware tomorrow, Puppy at the weekend - I remix whatever catches my attention and put my name on the result. Commitment isn't my strength, but variety absolutely is. You'll never be bored. Occasionally confused. 😅",
    release_date: new Date("2010-01-01"), // long-running series of respins, from around 2010 (exact day undocumented)
    originCountry: "Sweden",
    basedOn: "Arch, CRUX, Debian, deepin, Fedora, Gentoo, openSUSE, Puppy, Slackware",
    logo_path: "/logos/exton.png",
    screenshot_path: "/screenshots/exton.webp",
    website: "https://exton.net",
    tags: [Tag.LiveUsb, Tag.Obscure, Tag.Diy],
    red_flag:
      "I'm one person's respins with a version number, frequently behind a download fee, and the reviews are not kind.",
  },
  {
    slug: "voyager",
    name: "Voyager Live",
    tagline: "French, decorated, and my wallpapers are a personality.",
    description:
      "I arrive with conky on the desktop, a dock along the edge, and three hundred backgrounds I'd like your honest opinion on. Xfce underneath, so all of it stays fast. Style is free when someone else already did the theming. 😘",
    release_date: new Date("2010-01-01"), // first public releases, around 2010 (exact day undocumented)
    originCountry: "France",
    basedOn: "Debian, Xubuntu",
    logo_path: "/logos/voyager.png",
    screenshot_path: "/screenshots/voyager.webp",
    website: "https://voyagerlive.org",
    tags: [Tag.Polished, Tag.Beginner, Tag.Ricing],
    red_flag:
      "Take the theme off and I'm Xubuntu. Everything I do you could have done yourself with one afternoon and a config file.",
  },
  {
    slug: "gentoo",
    name: "Gentoo Linux",
    tagline: "Compile me. Slowly. With exactly the flags you like.",
    description:
      "Nothing about me is prebuilt. You pick the features, the flags and the optimisations, and I spend the evening becoming precisely what you asked for. High effort, high reward, and insufferable at parties. 😎",
    release_date: new Date("2002-03-31"), // Gentoo 1.0
    originCountry: "USA",
    basedOn: "Independent",
    logo_path: "/logos/gentoo.png",
    screenshot_path: "/screenshots/gentoo.webp",
    website: "https://www.gentoo.org",
    tags: [Tag.Rolling, Tag.Diy, Tag.Terminal],
    red_flag:
      "Your first install takes days, one USE flag change can rebuild the world, and I still expect you to read the handbook first.",
  },
  {
    slug: "mocaccino",
    name: "MocaccinoOS",
    tagline: "Italian, immutable, and I ship software like containers.",
    description:
      "I came out of Gentoo and Sabayon but I won't make you compile a thing - my package manager treats software as container images. Small footprint, vanilla kernels, cloud-ready. Espresso-sized and surprisingly strong. ☕",
    release_date: new Date("2020-01-01"), // first releases after the Sabayon lineage, 2020 (exact day undocumented)
    originCountry: "Italy",
    basedOn: "Independent",
    logo_path: "/logos/mocaccino.png",
    screenshot_path: "/screenshots/mocaccino.webp",
    website: "https://www.mocaccino.org",
    tags: [Tag.Immutable, Tag.Obscure, Tag.Server],
    red_flag:
      "Luet is mine and mine alone. Almost nobody knows it, and even fewer people can help when it misbehaves.",
  },
  {
    slug: "easyos",
    name: "EasyOS",
    tagline: "Every app in its own container, from the man who made Puppy.",
    description:
      "I'm an experiment and I say so out loud. Run any application - or the entire desktop - inside a container, manage all of it from little graphical tools, and keep the Puppy habit of doing what nobody else would try. 🧪",
    release_date: new Date("2017-02-01"), // Easy 0.1, February 2017 (exact day undocumented)
    originCountry: "Australia",
    basedOn: "Independent",
    logo_path: "/logos/easyos.png",
    screenshot_path: "/screenshots/easyos.webp",
    website: "https://easyos.org",
    tags: [Tag.Lightweight, Tag.Obscure, Tag.LiveUsb],
    red_flag:
      "Experimental isn't marketing here. One developer, unusual internals, and running as root is still very much on the table.",
  },
  {
    slug: "omegalinux",
    name: "OmegaLinux",
    tagline: "One gigabyte of RAM is plenty. I've worked with less.",
    description:
      "I rebuilt myself on an Arch base and kept LXDE, because old machines deserve current software too. Chilean, small, and genuinely happy on hardware that other distros politely describe as unsupported. 😊",
    release_date: new Date("2023-01-01"), // first public releases as a Lubuntu remix, 2023 (exact day undocumented)
    originCountry: "Chile",
    basedOn: "Arch, Debian, Ubuntu (LTS)",
    logo_path: "/logos/omegalinux.png",
    screenshot_path: "/screenshots/omegalinux.webp",
    website: "https://omegalinux.org",
    tags: [Tag.Rolling, Tag.Lightweight, Tag.Obscure],
    red_flag:
      "I swapped my entire foundation in 2026 and I'm a very small project. Rolling releases on a freshly rebuilt base is a bold combination.",
  },
  {
    slug: "slackware",
    name: "Slackware Linux",
    tagline: "The oldest one still standing. I predate your account.",
    description:
      "1993. No dependency resolver, no hand-holding, no committee. Edit the text file, run the script, understand exactly what happened and why. Everyone who really learned Linux learned it from someone like me. 😌",
    release_date: new Date("1993-07-17"), // Slackware 1.0
    originCountry: "USA",
    basedOn: "Independent",
    logo_path: "/logos/slackware.png",
    screenshot_path: "/screenshots/slackware.webp",
    website: "http://www.slackware.com",
    tags: [Tag.Stable, Tag.Diy, Tag.Terminal],
    red_flag:
      "You resolve dependencies yourself, and stable releases arrive whenever Patrick decides they're ready. Sometimes that's six years.",
  },
  {
    slug: "silverblue",
    name: "Fedora Silverblue",
    tagline: "You can't break me. I've checked. Twice.",
    description:
      "My system files are read-only and every update is an entirely new image, with the previous one still sitting there one reboot away. Flatpaks for your apps, a container for your development mess. Ruin me and I'll roll back to before we met. 😌",
    release_date: new Date("2018-10-30"), // named Silverblue with Fedora 29
    originCountry: "USA",
    basedOn: "Fedora",
    logo_path: "/logos/silverblue.png",
    screenshot_path: "/screenshots/silverblue.webp",
    website: "https://fedoraproject.org/atomic-desktops/silverblue/",
    tags: [Tag.Immutable, Tag.Polished, Tag.Corporate],
    red_flag:
      "Layering a single package costs you a reboot, and anything that wants to write into /usr is going to have a very bad evening.",
  },
  {
    slug: "steamos",
    name: "SteamOS",
    tagline: "I came with the handheld and I never left the couch.",
    description:
      "Press power, land in Big Picture, play. Someone at Valve spent years teaching Windows games to behave on Linux so that you'd never have to think about any of it. There's a full Plasma desktop behind the curtain if you get curious. 🎮",
    release_date: new Date("2013-12-13"), // SteamOS 1.0 beta
    originCountry: "USA",
    basedOn: "Arch",
    logo_path: "/logos/steamos.png",
    screenshot_path: "/screenshots/steamos.webp",
    website: "https://store.steampowered.com/steamos",
    tags: [Tag.Immutable, Tag.Gaming, Tag.Polished],
    red_flag:
      "Officially I'm for Valve's own hardware. Install me anywhere else and you're alone with a read-only base and no support.",
  },
  {
    slug: "asahi",
    name: "Asahi Linux",
    tagline: "I reverse-engineered your Mac. For fun. For years.",
    description:
      "Nobody documented this hardware, so a handful of people wrote the GPU driver from scratch by watching what the silicon did. Now your MacBook runs Linux with real acceleration, and every part of that cost somebody a decade. 😮",
    release_date: new Date("2022-03-18"), // first public alpha
    originCountry: "Global",
    basedOn: "Fedora",
    logo_path: "/logos/asahi.png",
    screenshot_path: "/screenshots/asahi.webp",
    website: "https://asahilinux.org",
    tags: [Tag.Polished, Tag.Diy, Tag.Arm],
    red_flag:
      "Newer Apple chips aren't supported, several pieces of hardware still don't work, and key developers have walked away.",
  },
  {
    slug: "secureblue",
    name: "secureblue",
    tagline: "Hardened, immutable, and yes, I've read the threat model.",
    description:
      "A hardened memory allocator, a locked-down kernel, and a browser built for the properly paranoid, all on top of an immutable base. I'm not for everyone - I'm for the person who finished the documentation before matching. 🛡️",
    release_date: new Date("2023-01-01"), // project began, 2023 (exact day undocumented)
    originCountry: "USA",
    basedOn: "Fedora",
    logo_path: "/logos/secureblue.png",
    screenshot_path: "/screenshots/secureblue.webp",
    website: "https://secureblue.dev",
    tags: [Tag.Immutable, Tag.SecurityTools, Tag.Privacy],
    red_flag:
      "Every layer of hardening breaks something else. Expect to spend real evenings working out what my defences just blocked.",
  },
  {
    slug: "qubes",
    name: "Qubes OS",
    tagline: "Security by isolation. I compartmentalise. It's healthy.",
    description:
      "Your banking lives in one virtual machine, your work in another, and that suspicious attachment in a disposable one that dies the moment you close it. Nothing I do can touch anything else. Snowden recommended me, apparently. 🧊",
    release_date: new Date("2012-09-03"), // Qubes OS 1.0
    originCountry: "Poland",
    basedOn: "Debian, Fedora",
    logo_path: "/logos/qubes.png",
    screenshot_path: "/screenshots/qubes.webp",
    website: "https://www.qubes-os.org",
    tags: [Tag.Privacy, Tag.SecurityTools, Tag.Diy],
    red_flag:
      "I want enormous amounts of RAM, I hate most laptops, and every single thing you do starts with deciding which qube it belongs in.",
  },
  {
    slug: "whonix",
    name: "Whonix",
    tagline: "Two machines, one gateway, zero leaks.",
    description:
      "I split myself in half so that your workstation never learns its own IP address. Everything goes through Tor because physically nothing else can get out. Even malware with root privileges has nobody to tell. 🕵️",
    release_date: new Date("2012-01-01"), // project began as TorBOX, 2012 (exact day undocumented)
    originCountry: "Canada",
    basedOn: "Debian (Stable)",
    logo_path: "/logos/whonix.png",
    screenshot_path: "/screenshots/whonix.webp",
    website: "https://www.whonix.org",
    tags: [Tag.Privacy, Tag.SecurityTools, Tag.Stable],
    red_flag:
      "I live inside a hypervisor and route everything through Tor. Both of those things cost you a great deal of speed.",
  },
  {
    slug: "trisquel",
    name: "Trisquel GNU/Linux",
    tagline: "One hundred percent libre. Including the awkward parts.",
    description:
      "Ubuntu with every proprietary line removed - no blobs, no closed firmware, nothing you can't read for yourself. The Free Software Foundation endorses me and Stallman actually uses me. Principles, quietly, all the way down. ✊",
    release_date: new Date("2005-01-01"), // project began, 2005 (exact day undocumented)
    originCountry: "Spain",
    basedOn: "Debian, Ubuntu",
    logo_path: "/logos/trisquel.png",
    screenshot_path: "/screenshots/trisquel.webp",
    website: "https://trisquel.info",
    tags: [Tag.Libre, Tag.Stable, Tag.Beginner],
    red_flag:
      "No proprietary firmware means your Wi-Fi card, your GPU and your printer may all simply not exist as far as I'm concerned.",
  },
  {
    slug: "parabola",
    name: "Parabola GNU/Linux-libre",
    tagline: "Arch, with every non-free package surgically removed.",
    description:
      "I took Arch, stripped out everything that wasn't free software, and the FSF put me on their list. Rolling, principled, and increasingly difficult to find - I haven't really been seen in a while. 🫥",
    release_date: new Date("2009-01-01"), // project began, 2009 (exact day undocumented)
    originCountry: "Chile",
    basedOn: "Arch",
    logo_path: "/logos/parabola.png",
    screenshot_path: "/screenshots/parabola.webp",
    website: "https://www.parabola.nu",
    tags: [Tag.Libre, Tag.Rolling, Tag.Obscure],
    red_flag:
      "I'm listed as dormant, my images are years old, and the blob-free kernel leaves a lot of your hardware in the dark.",
  },
  {
    slug: "pureos",
    name: "PureOS",
    tagline: "Free software, and I fit in your pocket as well.",
    description:
      "FSF-endorsed, privacy switched on before you arrive, and I run on both a laptop and a phone from the same company. No tracking, no telemetry, nothing proprietary anywhere. Convergence, but with ethics attached. 📱",
    release_date: new Date("2015-01-01"), // first releases from Purism, 2015 (exact day undocumented)
    originCountry: "France",
    basedOn: "Debian (Stable)",
    logo_path: "/logos/pureos.png",
    screenshot_path: "/screenshots/pureos.webp",
    website: "https://pureos.net",
    tags: [Tag.Libre, Tag.Privacy, Tag.Stable],
    red_flag:
      "I'm tied to Purism's hardware and their delivery record, and the mobile half of me is still very much a work in progress.",
  },
  {
    slug: "blackarch",
    name: "BlackArch Linux",
    tagline: "Two thousand security tools. Already installed.",
    description:
      "I'm less a distribution than a very large armoury you can bolt onto an Arch install you already have. Tiling window managers, no desktop niceties, and more tools than you will ever find time to run. 😈",
    release_date: new Date("2013-01-01"), // first public images, 2013 (exact day undocumented)
    originCountry: "USA",
    basedOn: "Arch",
    logo_path: "/logos/blackarch.png",
    screenshot_path: "/screenshots/blackarch.webp",
    website: "https://blackarch.org",
    tags: [Tag.SecurityTools, Tag.Rolling, Tag.Obscure],
    red_flag:
      "My ISOs are ancient, I'm listed as dormant, and thousands of unaudited tools are an attack surface of their own.",
  },
  {
    slug: "kodachi",
    name: "Linux Kodachi",
    tagline: "VPN, then Tor, then DNS nobody can follow.",
    description:
      "I chain a VPN into Tor before you've finished logging in, and I wipe the evidence on the way out. Every panel on my desktop tells you precisely how invisible you currently are. Anxious? Same, honestly. 🕶️",
    release_date: new Date("2013-01-01"), // first public releases, 2013 (exact day undocumented)
    originCountry: "Oman",
    basedOn: "Debian (Stable)",
    logo_path: "/logos/kodachi.png",
    screenshot_path: "/screenshots/kodachi.webp",
    website: "https://www.digi77.com/linux-kodachi/",
    tags: [Tag.Privacy, Tag.SecurityTools, Tag.LiveUsb],
    red_flag:
      "The VPN is the project's own service and my source availability has been questioned. That's a lot of trust for a privacy distro to ask.",
  },
  {
    slug: "tinycore",
    name: "Tiny Core Linux",
    tagline: "Sixteen megabytes. Yes, that's the whole desktop.",
    description:
      "I'm smaller than the photo you swiped on. I load into memory, put a graphical desktop in front of you, and let you add exactly the pieces you want and absolutely nothing else. Minimalism, taken personally. 🤏",
    release_date: new Date("2009-01-15"), // Tiny Core 1.0, January 2009
    originCountry: "USA",
    basedOn: "Independent (forked from Damn Small)",
    logo_path: "/logos/tinycore.png",
    screenshot_path: "/screenshots/tinycore.webp",
    website: "http://tinycorelinux.net",
    tags: [Tag.Lightweight, Tag.LiveUsb, Tag.Diy],
    red_flag:
      "Sixteen megabytes buys you almost nothing. Every single thing you need is an extension you have to find and load yourself.",
  },
  {
    slug: "dsl",
    name: "Damn Small Linux",
    tagline: "Back after twelve years away. Still fits on a CD.",
    description:
      "I disappeared in 2012 and came back in 2024, still determined to fit a real desktop - browser, office suite, mail - onto media nobody owns a drive for anymore. A comeback story with a 700MB limit. 💿",
    release_date: new Date("2003-01-01"), // original releases, 2003; relaunched 2024 (exact day undocumented)
    originCountry: "USA",
    basedOn: "Debian, antiX",
    logo_path: "/logos/dsl.png",
    screenshot_path: "/screenshots/dsl.webp",
    website: "https://www.damnsmalllinux.org",
    tags: [Tag.Lightweight, Tag.LiveUsb, Tag.Obscure],
    red_flag:
      "I'm 32-bit only, and my entire appeal is a size constraint that stopped mattering about fifteen years ago.",
  },
  {
    slug: "bodhi",
    name: "Bodhi Linux",
    tagline: "The Moksha desktop. Enlightenment, quite literally.",
    description:
      "I kept the Enlightenment 17 desktop alive after everyone else moved on, because nothing since has felt as good or run as light. Minimal by default, endlessly themeable, and completely calm about all of it. 🧘",
    release_date: new Date("2011-03-26"), // Bodhi Linux 1.0
    originCountry: "USA",
    basedOn: "Debian, Ubuntu",
    logo_path: "/logos/bodhi.png",
    screenshot_path: "/screenshots/bodhi.webp",
    website: "https://www.bodhilinux.com",
    tags: [Tag.Lightweight, Tag.Ricing, Tag.Beginner],
    red_flag:
      "Moksha is a fork of a desktop that was abandoned in 2013, kept going by very few people. Wayland is not in our future.",
  },
  {
    slug: "raspios",
    name: "Raspberry Pi OS",
    tagline: "Thirty-five pounds and I'll run your entire house.",
    description:
      "I've been somebody's first server, first robot, first retro console and first regret about soldering. Plug me into a television and I'll teach you Linux for less than the cost of dinner. Small board, big feelings. 🍓",
    release_date: new Date("2012-06-01"), // initial Raspbian build completed, June 2012
    originCountry: "United Kingdom",
    basedOn: "Debian (Stable)",
    logo_path: "/logos/raspios.png",
    screenshot_path: "/screenshots/raspios.webp",
    website: "https://www.raspberrypi.com/software/",
    tags: [Tag.Beginner, Tag.Arm, Tag.Stable],
    red_flag:
      "I'm tuned for one vendor's boards, I boot from an SD card that will eventually die, and some software never arrives on ARM at all.",
  },
  {
    slug: "postmarketos",
    name: "postmarketOS",
    tagline: "Ten years of updates for the phone they gave up on.",
    description:
      "Your manufacturer stopped caring after two years; I'm trying to give that device a whole decade. Alpine underneath, a real Linux desktop in your hand, and a stubborn refusal to let good hardware become landfill. 📱",
    release_date: new Date("2017-05-26"), // project announced, May 2017
    originCountry: "Netherlands",
    basedOn: "Alpine",
    logo_path: "/logos/postmarketos.png",
    screenshot_path: "/screenshots/postmarketos.webp",
    website: "https://postmarketos.org",
    tags: [Tag.Lightweight, Tag.Arm, Tag.Obscure],
    red_flag:
      "On most devices the camera, the modem, or both simply don't work. It's a phone you may not be able to phone with.",
  },
  {
    slug: "libreelec",
    name: "LibreELEC",
    tagline: "Just enough operating system to run your film.",
    description:
      "I'm not trying to be a computer. I boot straight into Kodi, play everything you own, and then vanish back into the television. No desktop, no distractions, no reason for you to ever open a terminal. 📺",
    release_date: new Date("2016-04-01"), // forked from OpenELEC, spring 2016 (exact day undocumented)
    originCountry: "USA",
    basedOn: "Independent (forked from OpenELEC)",
    logo_path: "/logos/libreelec.png",
    screenshot_path: "/screenshots/libreelec.webp",
    website: "https://libreelec.tv",
    tags: [Tag.Lightweight, Tag.Immutable, Tag.Polished],
    red_flag:
      "There is nothing here except Kodi. Want me to do anything else and you have picked entirely the wrong operating system.",
  },
  {
    slug: "proxmox",
    name: "Proxmox",
    tagline: "Bring me one spare machine. I'll hand you back twelve.",
    description:
      "Virtual machines, containers, clustering, backups and live migration, all from a browser tab on top of dependable Debian. Your pile of hardware in the cupboard stops being a hobby and starts being infrastructure. 🖥️",
    release_date: new Date("2008-04-15"), // Proxmox VE 0.9
    originCountry: "Austria",
    basedOn: "Debian (Stable)",
    logo_path: "/logos/proxmox.png",
    screenshot_path: "/screenshots/proxmox.webp",
    website: "https://www.proxmox.com",
    tags: [Tag.Server, Tag.Stable, Tag.Corporate],
    red_flag:
      "Without a subscription I nag you at every single login and quietly push you onto the no-subscription repository.",
  },
  {
    slug: "truenas",
    name: "TrueNAS",
    tagline: "ZFS. Your data will outlive this relationship.",
    description:
      "Checksums on everything, snapshots of everything, and scrubs that catch the quiet corruption you'd never notice yourself. I started life on FreeBSD and moved over to Debian, but the promise never changed: nothing you give me gets lost. 💾",
    release_date: new Date("2005-10-01"), // as FreeNAS, 2005; the Debian-based SCALE branch arrived 2022
    originCountry: "France, USA",
    basedOn: "Debian (Stable)",
    logo_path: "/logos/truenas.png",
    screenshot_path: "/screenshots/truenas.webp",
    website: "https://www.truenas.com",
    tags: [Tag.Server, Tag.Stable, Tag.Corporate],
    red_flag:
      "ZFS wants ECC memory, a great deal of RAM, and pool layouts you cannot change your mind about afterwards.",
  },
  {
    slug: "chimera",
    name: "Chimera Linux",
    tagline: "BSD tools, LLVM everywhere, and not a GNU in sight.",
    description:
      "I'm assembled from parts nobody else combines - FreeBSD's userland, the Clang toolchain, Dinit for services and Alpine's package manager. It shouldn't work as well as it does. There's no installer either; bootstrap me by hand. 😌",
    release_date: new Date("2021-06-01"), // project began, mid-2021 (exact day undocumented)
    originCountry: "Spain",
    basedOn: "Independent",
    logo_path: "/logos/chimera.png",
    screenshot_path: "/screenshots/chimera.webp",
    website: "https://chimera-linux.org",
    tags: [Tag.Rolling, Tag.Diy, Tag.Obscure],
    red_flag:
      "No installer, no glibc, no systemd, and a young project. Every assumption your software makes about Linux is probably wrong here.",
  },
  {
    slug: "rhel",
    name: "Red Hat Enterprise Linux",
    tagline: "I have a support contract and I expect you to sign it.",
    description:
      "Ten years of support per release, certified hardware, and an entire industry's compliance paperwork built around me. I'm not here for your gaming rig. I'm here because a bank needs to know exactly who to call at 3am. 💼",
    release_date: new Date("2002-03-26"), // Red Hat Enterprise Linux 2.1
    originCountry: "USA",
    basedOn: "Fedora",
    logo_path: "/logos/rhel.png",
    screenshot_path: "/screenshots/rhel.webp",
    website: "https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux",
    tags: [Tag.Server, Tag.Corporate, Tag.Stable],
    red_flag:
      "I cost real money, my packages are deliberately ancient, and my trademark rules have ended several downstream projects.",
  },
  {
    slug: "oracle",
    name: "Oracle Linux",
    tagline: "Free to download. That sentence has a history.",
    description:
      "I'm RHEL rebuilt, plus a kernel I tuned myself and patching that doesn't require a reboot. If your database already has my name on it, the two of us were always going to end up here. Enterprise, unbreakable, faintly ominous. 🏢",
    release_date: new Date("2006-10-25"), // announced as Unbreakable Linux, October 2006
    originCountry: "USA",
    basedOn: "Red Hat",
    logo_path: "/logos/oracle.png",
    screenshot_path: "/screenshots/oracle.webp",
    website: "https://www.oracle.com/linux/",
    tags: [Tag.Server, Tag.Corporate, Tag.Stable],
    red_flag:
      "The name on the box is Oracle. Read the licensing twice, then have somebody else read it as well.",
  },
  {
    slug: "guix",
    name: "Guix System",
    tagline: "Declarative, reproducible, and written entirely in Lisp.",
    description:
      "Describe the system you want in Scheme and I'll build exactly that, roll it back whenever you ask, and reproduce it identically years from now on someone else's machine. Fully free software throughout. Parentheses are a love language. 🥰",
    release_date: new Date("2013-01-18"), // GNU Guix 0.1
    originCountry: "France",
    basedOn: "Independent",
    logo_path: "/logos/guix.png",
    screenshot_path: "/screenshots/guix.webp",
    website: "https://guix.gnu.org",
    tags: [Tag.Diy, Tag.Libre, Tag.Terminal],
    red_flag:
      "No proprietary firmware, a modest package set, and everything - everything - is Guile Scheme. I hope you like brackets.",
  },
  {
    slug: "deepin",
    name: "deepin",
    tagline: "The prettiest desktop nobody in the West quite trusts.",
    description:
      "I built my own desktop environment, my own applications, and an interface that genuinely looks designed rather than assembled from spare parts. Every reviewer calls me beautiful, then spends the rest of the paragraph on something else. 😌",
    release_date: new Date("2004-02-28"), // as Hiweed Linux, 2004 (exact day undocumented)
    originCountry: "China",
    basedOn: "Debian",
    logo_path: "/logos/deepin.png",
    screenshot_path: "/screenshots/deepin.webp",
    website: "https://www.deepin.org",
    tags: [Tag.Polished, Tag.Beginner, Tag.Stable],
    red_flag:
      "Telemetry and app-store questions sit in my history. Beautiful, yes, but people are going to ask you about it.",
  },
];
