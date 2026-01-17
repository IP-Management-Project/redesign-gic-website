import { useQuery } from "@tanstack/react-query";

export type SeasonalHighlight = {
  season: string;
  year: string;
  winner: string;
  teams: string[];
  desc: string;
};

export type GalleryItem = {
  id: number;
  label: string;
  image: string;
  span: string;
};

export type IncubationShowcaseData = {
  seasons: SeasonalHighlight[];
  gallery: GalleryItem[];
};

const incubationShowcaseData: IncubationShowcaseData = {
  seasons: [
    { season: "Season 8", year: "2025", winner: "EcoPulse AI", teams: ["EcoPulse", "KhmerPay", "AgroTech"], desc: "Focus on AI-driven sustainability." },
    { season: "Season 7", year: "2024", winner: "CyberShield GIC", teams: ["CyberShield", "EduConnect", "LogiKh"], desc: "Emphasis on Cybersecurity and Education." },
    { season: "Season 6", year: "2023", winner: "SmartGrid KH", teams: ["SmartGrid", "HealthPoint", "V-Retail"], desc: "Innovations in Energy and Health-tech." },
    { season: "Season 5", year: "2022", winner: "L2K Romanizer", teams: ["L2K", "SwiftBiz", "SecureAuth"], desc: "Pioneering Khmer NLP applications." },
    { season: "Season 4", year: "2021", winner: "FarmFlow", teams: ["FarmFlow", "TrackIt", "MarketHub"], desc: "Agri-tech and supply chain focus." },
    { season: "Season 3", year: "2020", winner: "MedLink", teams: ["MedLink", "CodeCamp", "FinVibe"], desc: "Digital healthcare solutions." },
    { season: "Season 2", year: "2019", winner: "KhmerOCR Pro", teams: ["KhmerOCR", "BusLine", "EasyWash"], desc: "Early adoption of Computer Vision." },
    { season: "Season 1", year: "2018", winner: "GIC Startup 01", teams: ["Startup01", "WebReady", "LocalGuide"], desc: "The foundational year of TIC." },
  ],
  gallery: [
    {
      id: 1,
      label: "Team Collaboration",
      image:
        "https://scontent.fpnh5-2.fna.fbcdn.net/v/t39.30808-6/558978686_1238860318271947_3288537438497057440_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGvdOTtEsnN-7X4xRBIV97ULJlGAFp2GCksmUYAWnYYKb8JkR6v9nVy_L7h1XBfZBDepVR6gKwXz4C13n07_W9C&_nc_ohc=H2waghLz5l4Q7kNvwGPub8H&_nc_oc=AdkwycQwSeKHSvdM74lBA0C8BB5BkreWD6oWCorlaYMVlFDejV7RYtmYgOOLgw_hjRM&_nc_zt=23&_nc_ht=scontent.fpnh5-2.fna&_nc_gid=9kyxLlyEjGiV4Ss9vysIag&oh=00_AfpqGGMXqLZXm8G2fMSXZ76JzH_PV5Ux6fyPhnx8LL4coA&oe=696F85D0",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: 2,
      label: "Deep-Tech R&D",
      image:
        "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/559563753_1238859958271983_785469373472755855_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGQVQE8c3xwwjQs_8SqouYWxirwoCxE4JbGKvCgLETglq7YrFZyXzM9fRMXdmjzQ9yEse6lZlJalY2dW5P3bMJA&_nc_ohc=qPsYKzlPV5MQ7kNvwExo6gs&_nc_oc=AdlonmUeM7Krvp_i6LlbXsY_8B7TWFFcryY_mvfyFQlYfAq07gCgHb8Q2ZwXMytlPHo&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=VVudBt65y2m3UnaHj--FVA&oh=00_Afq4M8zyak3b9kBqAiqflY4cg4OghylXkzpDy_pNupo0TQ&oe=696F64C0",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      id: 3,
      label: "Pitch Prep",
      image:
        "https://scontent.fpnh5-1.fna.fbcdn.net/v/t39.30808-6/557630731_1238859601605352_9035987190156655488_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEgentrVbWVfJSLqFeZswsi9N0UX4n_sQL03RRfif-xAgCiP0UKmtw1OOLm7s6SuJ3Ojp6CKlkfRwr9dxj72oCB&_nc_ohc=_CtkJLEFqoUQ7kNvwHEuJmO&_nc_oc=Adku00rY2jht2Sgc8ROgqKjkLj0_jls2ql7UE2szVQngLOu5_iUbHYaCjdnGBaNftrc&_nc_zt=23&_nc_ht=scontent.fpnh5-1.fna&_nc_gid=IBwWbWFHhXuCl3RCqe9HJA&oh=00_Afo4CEg_ebM9m4m4gFX0WMyX5XGNmzmk2tOcDGJNeehwVA&oe=696F73AC",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 4,
      label: "Mentorship",
      image:
        "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/538405292_1202814045209908_793807315325429063_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHTsMeXF14N4yK0X77x0ZkLIcY4hNw8fJIhxjiE3Dx8kopjtVGODmu_rnBb3h-9KKRutk6OA8nd6It6p4wjxD3S&_nc_ohc=wy-K185nCrsQ7kNvwFeyLbq&_nc_oc=Adnud4-7-qO8KVhkZJf4uF0Igwt7EEXy2thbHSHnZqLDWc26yCODr3TgumBCmZ_VWbk&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=MpNzSaK3nkAywk1m-dfHew&oh=00_AfrPiXo6eFV7xlE8b0ZySxb1dSOLF5pvTqVjfUda4iTu9w&oe=696F877D",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 5,
      label: "Final Pitch",
      image:
        "https://scontent.fpnh5-5.fna.fbcdn.net/v/t39.30808-6/511699120_1151205027037477_7611794635371917837_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHfUuERfkxVUsGQLLFcapGndWd4wsNUJXp1Z3jCw1Qlei5ey7qScH-MQ7So8RKc2v9NevuwMrnBVfGVMxrzR5p-&_nc_ohc=bXyIEgt4gNMQ7kNvwFnCEin&_nc_oc=Adnt4apA7krU23VbirxxzLaeKWnR8XBIRHOB9rkDiqbXecEWTQlJmeHmi_X734PeIus&_nc_zt=23&_nc_ht=scontent.fpnh5-5.fna&_nc_gid=99Onz1diPShY2j2w4PuvUw&oh=00_Afo3Ga5vX7LxbGI7BXKrGMx3SCDGJo3wYt9kU60URuLfGg&oe=696F7780",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      id: 6,
      label: "The TIC Community",
      image:
        "https://scontent.fpnh5-6.fna.fbcdn.net/v/t39.30808-6/529739917_1188654433292536_4362865142075681020_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGdb2T5xhLQ-ocZsAk0oUBYhjkUuQ4q_vyGORS5Dir-_B3iGDEp69uB8XZi9sXSZrN34FtyMDXsWBIYGKdfOkQD&_nc_ohc=kxq2Mntun1YQ7kNvwH9nWYW&_nc_oc=AdmezfEr9x6qXLorHmWUNdhzymnZHx72bzQFRx4fgpVR3bq-m_ZfIPIAXpm2HVZ4XKc&_nc_zt=23&_nc_ht=scontent.fpnh5-6.fna&_nc_gid=Yw-yo32kULhWGuPHYe-DnQ&oh=00_AfpEcRFOxo-XxQTlIztNOJpAReDddIwJfPdsRNMXt24sOw&oe=696F5F18",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      id: 7,
      label: "Awards Night",
      image:
        "https://scontent.fpnh5-6.fna.fbcdn.net/v/t39.30808-6/510516476_1151203370370976_384403387145784598_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFAKonzoxvNotXn7trjv58hcP4E8vNOvXBw_gTy8069cC9ul70bg2Ly8Vnk0mjZlMF3Mfvr-YCIFCM3U0aPwbFE&_nc_ohc=gAItZlOPM3oQ7kNvwG6SsOO&_nc_oc=AdnJY7TzNkMOImCdzZhqC_AgpMxUhcfpzdw74Ou4fq2j66yh0oOe62P9pLk2kSsHQrM&_nc_zt=23&_nc_ht=scontent.fpnh5-6.fna&_nc_gid=VYapmksD1jl0n_6tYrRHgQ&oh=00_AfqZ0udB_x1oSYBpNoWwr-qNNrm6vYuoFHWP7WzfFyduCg&oe=696F62D1",
      span: "md:col-span-1 md:row-span-1",
    },
  ],
};

const getIncubationShowcaseData = async (): Promise<IncubationShowcaseData> => incubationShowcaseData;

export function useIncubationShowcaseData() {
  return useQuery({
    queryKey: ["incubationShowcase"],
    queryFn: getIncubationShowcaseData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
