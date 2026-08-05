import * as cheerio from 'cheerio';
import { writeFileSync } from "fs"

const url = "https://distrowatch.com/table.php?distribution="

const headers: HeadersInit = {
    "User-Agent": "Linuxinder",
    "Accept": "text/html",
    "Accept-Language": "en",
    "From": "piotr.wittig@gmail.com"
}

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const slugs = [
  "cachyos", "mint", "mx", "popos", "debian", "zorin", "fedora", "ubuntu",
  "endeavour", "bazzite", "manjaro", "arch", "anduinos", "pikaos", "opensuse",
  "biglinux", "nobara", "antix", "void", "nixos", "omarchy", "artix",
  "elementary", "q4os", "pearos", "mageia", "neon", "minios", "aerynos",
  "pclinuxos", "kali", "alpine", "lite", "bluestar", "puppy", "garuda",
  "zimaos", "tails", "sparkylinux", "tuxedo", "devuan", "hackeros", "solus",
  "kdelinux", "kubuntu", "fydeos", "parrot", "centos", "linuxfx", "gnomeos",
  "kaos", "almalinux", "exton", "voyager", "gentoo", "mocaccino", "easyos",
  "omegalinux", 
"slackware", "silverblue", "steamos", "asahi", "secureblue", "qubes",
"whonix", "trisquel", "parabola", "pureos", "blackarch", "kodachi",
"tinycore", "dsl", "bodhi", "raspios", "postmarketos", "libreelec",
"proxmox", "truenas", "chimera", "rhel", "oracle", "guix", "deepin",
];

const getDistroInfo = async (distributionName: string) => {
    try {
        const response = await fetch(url + distributionName, {method: "GET", headers: headers});
        const data = await response.text()

        const $ = cheerio.load(data)
        
        let info = "";
        $('.TablesTitle').each((index, element) => {
            info += $(element).text()
        })

        return info
        

    }
    catch (err) {
        console.log("Error ", err)
    }
}

type distro = {
    name: string,
    description: string,
}

const distrosData: distro[] = []

for (const slug of slugs) {
    const info = await getDistroInfo(slug)
    console.log(info)
    if (info !== undefined) {
        const distro: distro = {
            name: slug,
            description: info.trim()
        }
        distrosData.push(distro)
        console.log(slug + " - Done!")
        await delay(1000)
    }
}

writeFileSync("./tools/output/data.json", JSON.stringify(distrosData, null, 2), "utf-8")

export {}