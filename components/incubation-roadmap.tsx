"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Trophy, Users, Flame, Star, ArrowRight,
  Monitor, Lightbulb, History, Target, Zap, Globe,
  Cpu, Calendar, CheckCircle2, ChevronRight, Handshake,
  ShieldCheck, Presentation, PenTool
} from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { Divider } from "@heroui/divider";
import Image from "next/image";
import { ThreeDMarquee } from "./ui/3d-marquee";

const ticRoadmap = [
  { stage: "Registration", date: "22 Apr - 16 May, 2025", desc: "Initial sign-up phase for student teams.", color: "bg-amber-500" },
  { stage: "Week 1", date: "31 May - 01 Jun, 2025", desc: "Team up, find topic/solution, and build initial prototype.", color: "bg-[#007d49]" },
  { stage: "Week 2", date: "07 Jun, 2025", desc: "Test prototype with user feedback and pitch training.", color: "bg-[#007d49]/80" },
  { stage: "Week 3", date: "14 Jun, 2025", desc: "Semi-final presentation and feedback loop.", color: "bg-[#007d49]/70" },
  { stage: "Week 4", date: "21 Jun, 2025", desc: "Final-Pitch Day and Awards Ceremony.", color: "bg-[#007d49]/60" },
  { stage: "Pre-Incubation", date: "Post-Competition", desc: "Official entry into the 2025 Incubator.", color: "bg-zinc-800" },
];

const partners = [
  { name: "Smart Axiata", role: "Primary Sponsor", img: "/ministry-logo/smart.png" },
  { name: "Khmer Enterprise", role: "Ecosystem Partner", img: "/ministry-logo/ke.png" },
  { name: "UNIPRENEUR", role: "Strategic Partner", img: "/ministry-logo/ke.png" },
  { name: "CBRD Fund", role: "Funding Partner", img: "/ministry-logo/cbrd.png" },
  { name: "FTB Bank", role: "Banking Partner", img: "/ministry-logo/ftb.png" },
];

const ministries = [
  { name: "Moeys", role: "Ministry of Education", img: "/ministry-logo/moeys.png" },
  { name: "MIS", role: "Ministry Support", img: "/ministry-logo/mis.png" },
];

export default function TICIncubationHub() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const marqueeImages = [
    "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/513094848_1151203823704264_4229542995200045651_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeFg7st880wuv943TsNV3e75ynWONrDkCv3KdY42sOQK_b0fqhysPFmTkKB5FyMjRpvlVIt-aNM-h13JvYpCNvf8&_nc_ohc=EgCqTujZOfcQ7kNvwF7O9uP&_nc_oc=AdktGX_Sa4VMy1oNh12-59wJcZwZhbHHJAJjyAEvoeNqnOLsqAxZCOGv3OyTByL0b0U&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=82ApDkJmx-gyhuSqBbzYXw&oh=00_Afr-CLXpG2CBDq4po6siS9C-_PzDOBY6L7JIskpl_t_aIQ&oe=696F6700",
    "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/510727674_1151203497037630_8698561890902700553_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeEe3DkG6271Q4ZMeMhrwB3KkpRsZASXk72SlGxkBJeTvZLBP5qiHAzQxpQ8gQk0COHKkKGxRoQd8OTA7tzjhB3s&_nc_ohc=L0MIGcrmBgwQ7kNvwFD-Nhc&_nc_oc=AdmtzWg_lcEbVvJETjW_dFpYSvs7kf2UbCwWhkVrIbFz2Ru9Z0YK7rIlZtIhKheKHgk&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=DdD0uzFrf7UqZt44z7Ig1A&oh=00_AfpYVq_fGxncD5fnKhtFqt6xbthrZqL1ycB2a9vfvM4ZlQ&oe=696F6F89",
    "https://scontent.fpnh5-5.fna.fbcdn.net/v/t39.30808-6/509442165_1151203327037647_8567452368490511120_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeHGMnnFjdQ0CxoOnFeqnvcR_C4FXbrEAWD8LgVdusQBYAMlCTXdrqoHDNF2MkjDgJjKC_Uu9xDnXZ0QpfyRHiCb&_nc_ohc=C2pVSgRyaXQQ7kNvwGa9lsC&_nc_oc=AdnGdlL5EfDA6oiiEcBjLOMu0faAHeNkkCdzII__OIcJ2H3DzIBB38dExjfh2qzp7-4&_nc_zt=23&_nc_ht=scontent.fpnh5-5.fna&_nc_gid=DdD0uzFrf7UqZt44z7Ig1A&oh=00_Afoi4Oj3ZXSSwV7_otSEgKoWlhHZP0TqoPs6RR_ENe7T_Q&oe=696F6EBD",
    "https://scontent.fpnh5-5.fna.fbcdn.net/v/t39.30808-6/508566230_1145617590929554_344641624901097043_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGaAjflbWvSHIR65Xqf2xeyKqWXfni7EtoqpZd-eLsS2l5i2Y6cDq3IPwobkiECYnQW4Llo8z-E0S6I95FvtM18&_nc_ohc=hYnqxJqRER8Q7kNvwEPqqwb&_nc_oc=AdndN9k5r51IPXXM0Cm6IOn9RlFkJl7FztyCNtjp6Kj35KEVgNJYZR0SU9D7Y5EgIP8&_nc_zt=23&_nc_ht=scontent.fpnh5-5.fna&_nc_gid=vcDg2BXlV8l8GQiICmsI0g&oh=00_AfoeUAmx-h7TLyd_IqFEX8Gkmuz60ZTvG_I51RoL2Pd5_w&oe=696F756B",
    "https://scontent.fpnh5-6.fna.fbcdn.net/v/t39.30808-6/510516476_1151203370370976_384403387145784598_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=103&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeFAKonzoxvNotXn7trjv58hcP4E8vNOvXBw_gTy8069cC9ul70bg2Ly8Vnk0mjZlMF3Mfvr-YCIFCM3U0aPwbFE&_nc_ohc=gAItZlOPM3oQ7kNvwG6SsOO&_nc_oc=AdnJY7TzNkMOImCdzZhqC_AgpMxUhcfpzdw74Ou4fq2j66yh0oOe62P9pLk2kSsHQrM&_nc_zt=23&_nc_ht=scontent.fpnh5-6.fna&_nc_gid=DdD0uzFrf7UqZt44z7Ig1A&oh=00_Afqqv_1REjsq1MV7TIu80rHi-i2VoKmu5pC2ALcpeW29Fw&oe=696F62D1",
    "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/557629511_1238870708270908_7114777280134469736_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeHsM6mD0KMWoyMh3KgvJ2rnwh07ORI5YkzCHTs5EjliTGR7tqp1qa7kptk6VuPVopk5ZZDkZ_0SnQKsBkgK-AQd&_nc_ohc=jSlGwVgTItEQ7kNvwGN8ObD&_nc_oc=Adk3gqUbR6ZJ9StXM40pPdyndMo7YBsr2qctohuHsV_4cGGW645IdUQ6smgQ2fSsxvs&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=JK6LO-PV8bEHkIf1wm-Q1Q&oh=00_AfphB7BSniPyCa4o2WPu1FLD5f3Qv4ls8o_bv8WnpMpwqQ&oe=696F70D4",
    "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/558990119_1238859411605371_2292521190265694153_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGKcgdCjw3XDeno8knvI6iIoO8cLMiJ7lOg7xwsyInuU3JGP1eE5zwuPpOd35Ci4kxGaX3lkT6gnR_uHbMTgXIK&_nc_ohc=ltfGSxQowI8Q7kNvwE-ff8o&_nc_oc=Adn-om4EkmF25KiQjG4AaXBAplsNIJ7PvUE9GMqE-fTOKYLtMzlnF92pLHt-_W3x7JY&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=jppj-b4BpiRAoBi4lYY5yg&oh=00_AfrbpFFSnkExPO55afjef6kto0QYkVtBgvNKepmsmMbG_w&oe=696F6D05",
    "https://scontent.fpnh5-2.fna.fbcdn.net/v/t39.30808-6/558114588_1238859628272016_7914605263642180077_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=107&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGXz4x87H2Yh6XZ7iRc1qXKRQKnDr5-qv1FAqcOvn6q_YjLjW2dUVOvBhNUnvgpO_LNtTbKVzR8Lqrak6SAxy97&_nc_ohc=_uJvAT8OFegQ7kNvwEw6M3T&_nc_oc=AdnSB71sab8iRF2Ag3cPsS5n6EaJj_H2VCoEuIXXMA1dk3zdeYuVa_cHzOKdZ7H0EzQ&_nc_zt=23&_nc_ht=scontent.fpnh5-2.fna&_nc_gid=nWbdET0UvjVVCIf7OMZxEQ&oh=00_AfoYgUncT7o-r7Bc35yiGJTdujTiAFZIl2aKQexHLbO-PQ&oe=696F850A",
    "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/558818680_1238859831605329_9033692728136919013_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeE8KzHgGhMhVHrFcIQY1G3y-5KH2fZ4sxX7kofZ9nizFagQ-IcS_Q98YtJjoDJ5xMFbJwjjRGlHnubl-sI0I4X5&_nc_ohc=1OKlnyytXOQQ7kNvwEwFGo-&_nc_oc=AdmKupDLOBJBrBMShq0fVzm_Q47SSziMTeg7r4QUwwgTUPh5OXI6vIfDZEe24Nc445A&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=W7VEYYwgwdWWVG5kP6cqDQ&oh=00_AfpNo4v4Zo3ICoAThaTvZf3I3wc0QJGjvqfZ3CKyUyIiTQ&oe=696F8F36",
    "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/513094848_1151203823704264_4229542995200045651_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeFg7st880wuv943TsNV3e75ynWONrDkCv3KdY42sOQK_b0fqhysPFmTkKB5FyMjRpvlVIt-aNM-h13JvYpCNvf8&_nc_ohc=EgCqTujZOfcQ7kNvwF7O9uP&_nc_oc=AdktGX_Sa4VMy1oNh12-59wJcZwZhbHHJAJjyAEvoeNqnOLsqAxZCOGv3OyTByL0b0U&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=82ApDkJmx-gyhuSqBbzYXw&oh=00_Afr-CLXpG2CBDq4po6siS9C-_PzDOBY6L7JIskpl_t_aIQ&oe=696F6700",
    "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/510727674_1151203497037630_8698561890902700553_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeEe3DkG6271Q4ZMeMhrwB3KkpRsZASXk72SlGxkBJeTvZLBP5qiHAzQxpQ8gQk0COHKkKGxRoQd8OTA7tzjhB3s&_nc_ohc=L0MIGcrmBgwQ7kNvwFD-Nhc&_nc_oc=AdmtzWg_lcEbVvJETjW_dFpYSvs7kf2UbCwWhkVrIbFz2Ru9Z0YK7rIlZtIhKheKHgk&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=DdD0uzFrf7UqZt44z7Ig1A&oh=00_AfpYVq_fGxncD5fnKhtFqt6xbthrZqL1ycB2a9vfvM4ZlQ&oe=696F6F89",
    "https://scontent.fpnh5-5.fna.fbcdn.net/v/t39.30808-6/509442165_1151203327037647_8567452368490511120_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeHGMnnFjdQ0CxoOnFeqnvcR_C4FXbrEAWD8LgVdusQBYAMlCTXdrqoHDNF2MkjDgJjKC_Uu9xDnXZ0QpfyRHiCb&_nc_ohc=C2pVSgRyaXQQ7kNvwGa9lsC&_nc_oc=AdnGdlL5EfDA6oiiEcBjLOMu0faAHeNkkCdzII__OIcJ2H3DzIBB38dExjfh2qzp7-4&_nc_zt=23&_nc_ht=scontent.fpnh5-5.fna&_nc_gid=DdD0uzFrf7UqZt44z7Ig1A&oh=00_Afoi4Oj3ZXSSwV7_otSEgKoWlhHZP0TqoPs6RR_ENe7T_Q&oe=696F6EBD",
    "https://scontent.fpnh5-5.fna.fbcdn.net/v/t39.30808-6/508566230_1145617590929554_344641624901097043_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGaAjflbWvSHIR65Xqf2xeyKqWXfni7EtoqpZd-eLsS2l5i2Y6cDq3IPwobkiECYnQW4Llo8z-E0S6I95FvtM18&_nc_ohc=hYnqxJqRER8Q7kNvwEPqqwb&_nc_oc=AdndN9k5r51IPXXM0Cm6IOn9RlFkJl7FztyCNtjp6Kj35KEVgNJYZR0SU9D7Y5EgIP8&_nc_zt=23&_nc_ht=scontent.fpnh5-5.fna&_nc_gid=vcDg2BXlV8l8GQiICmsI0g&oh=00_AfoeUAmx-h7TLyd_IqFEX8Gkmuz60ZTvG_I51RoL2Pd5_w&oe=696F756B",
    "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/510530676_1151203030371010_4771621723826287110_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=108&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeEt_nzrWL4f0s7y-Lzp8jQKKBTp119dST4oFOnXX11JPkyW3GFb_raz3uXJexwCxIZj4Fk6cI8kqrW6xjIJjGZz&_nc_ohc=d_LuruFe-wYQ7kNvwGSjYk9&_nc_oc=Adnt-KJECM4VQe1i5NuudhdA-6vHBabPRUQaA8ffluZMbU7goZILXBcfMjZgiF_ktCY&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=cDPjQujo5SZgYKGu_7U-Dg&oh=00_Afog9d6Lb60R1HynwAkqr8cXurIYYkoy8uIBmqcTB4TlZQ&oe=696F5F1B",
    "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/511097462_1151203570370956_4903906963075156865_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=110&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeHgvImS01D6Y1Hm3AvFWqzhpYmPs5Z_Y_SliY-zln9j9Ess-0HY6PlkRk-GsiFfAgkWt8ppRBvwKsbp-823Z6QD&_nc_ohc=Fd6hRWGqSYoQ7kNvwFnifjD&_nc_oc=Admxu4GndzCOU42iwpNWndZaDDXrKyvjQ76-DNzNPHYqIX1yLQ_Yy2wz-Gqk5u4WRBY&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=82ApDkJmx-gyhuSqBbzYXw&oh=00_AfrJOzOywcID3KP8dt3CEHZ1zv0ZKHeDUR8q3YHSrrU_4g&oe=696F919F",
    "https://scontent.fpnh5-2.fna.fbcdn.net/v/t39.30808-6/536282670_1202814508543195_7068321417237609382_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=107&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGZkbGCd0Cqg_WMFIviG1yNbd9q5UFPbI9t32rlQU9sj7WWZuG7Y3-8vJ4bYExo_5q-e_Alf7VszC_Jdjx_nb_B&_nc_ohc=02WlTkP0UCkQ7kNvwFz-wZz&_nc_oc=AdlAiR2uJoGg9IiL8ivtGouraGKamI15QUENbVCHkMVcusfCRAsKJgXgOo6pR4xyczg&_nc_zt=23&_nc_ht=scontent.fpnh5-2.fna&_nc_gid=xJ8Bp9Ekk4b69kTBJ1YOlQ&oh=00_AfriQU8SCH410NyyfAlMHmprU0TVKW4mz91ynMLNQxhnqw&oe=696F6CA5",
    "https://scontent.fpnh5-2.fna.fbcdn.net/v/t39.30808-6/558929853_1238859001605412_2821512467636062644_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=102&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeE_62JxQ9irIsx8lZOgoyGILXcl4mRnoW0tdyXiZGehbV8lH1XE4iCoZR4nPgaU1Dhe_s9A6AjE1CTx8YHbA95W&_nc_ohc=xlyAvQtyRaAQ7kNvwGtp2Au&_nc_oc=Adm6khH8wh_KTcVItxx0X8wUz-oSDdj9f4fHtNImXtbwTJp1_Ok9ZeLjRIrYTzV6Dv0&_nc_zt=23&_nc_ht=scontent.fpnh5-2.fna&_nc_gid=jppj-b4BpiRAoBi4lYY5yg&oh=00_AfrXHUkBx1yDJQBBbARHSHWMlY_779mrIDOVN8hcH4f2rw&oe=696F9374",
    "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/557629511_1238870708270908_7114777280134469736_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeHsM6mD0KMWoyMh3KgvJ2rnwh07ORI5YkzCHTs5EjliTGR7tqp1qa7kptk6VuPVopk5ZZDkZ_0SnQKsBkgK-AQd&_nc_ohc=jSlGwVgTItEQ7kNvwGN8ObD&_nc_oc=Adk3gqUbR6ZJ9StXM40pPdyndMo7YBsr2qctohuHsV_4cGGW645IdUQ6smgQ2fSsxvs&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=JK6LO-PV8bEHkIf1wm-Q1Q&oh=00_AfphB7BSniPyCa4o2WPu1FLD5f3Qv4ls8o_bv8WnpMpwqQ&oe=696F70D4",
    "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/558990119_1238859411605371_2292521190265694153_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGKcgdCjw3XDeno8knvI6iIoO8cLMiJ7lOg7xwsyInuU3JGP1eE5zwuPpOd35Ci4kxGaX3lkT6gnR_uHbMTgXIK&_nc_ohc=ltfGSxQowI8Q7kNvwE-ff8o&_nc_oc=Adn-om4EkmF25KiQjG4AaXBAplsNIJ7PvUE9GMqE-fTOKYLtMzlnF92pLHt-_W3x7JY&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=jppj-b4BpiRAoBi4lYY5yg&oh=00_AfrbpFFSnkExPO55afjef6kto0QYkVtBgvNKepmsmMbG_w&oe=696F6D05",
    "https://scontent.fpnh5-2.fna.fbcdn.net/v/t39.30808-6/558114588_1238859628272016_7914605263642180077_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=107&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGXz4x87H2Yh6XZ7iRc1qXKRQKnDr5-qv1FAqcOvn6q_YjLjW2dUVOvBhNUnvgpO_LNtTbKVzR8Lqrak6SAxy97&_nc_ohc=_uJvAT8OFegQ7kNvwEw6M3T&_nc_oc=AdnSB71sab8iRF2Ag3cPsS5n6EaJj_H2VCoEuIXXMA1dk3zdeYuVa_cHzOKdZ7H0EzQ&_nc_zt=23&_nc_ht=scontent.fpnh5-2.fna&_nc_gid=nWbdET0UvjVVCIf7OMZxEQ&oh=00_AfoYgUncT7o-r7Bc35yiGJTdujTiAFZIl2aKQexHLbO-PQ&oe=696F850A",
    "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/558818680_1238859831605329_9033692728136919013_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeE8KzHgGhMhVHrFcIQY1G3y-5KH2fZ4sxX7kofZ9nizFagQ-IcS_Q98YtJjoDJ5xMFbJwjjRGlHnubl-sI0I4X5&_nc_ohc=1OKlnyytXOQQ7kNvwEwFGo-&_nc_oc=AdmKupDLOBJBrBMShq0fVzm_Q47SSziMTeg7r4QUwwgTUPh5OXI6vIfDZEe24Nc445A&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=W7VEYYwgwdWWVG5kP6cqDQ&oh=00_AfpNo4v4Zo3ICoAThaTvZf3I3wc0QJGjvqfZ3CKyUyIiTQ&oe=696F8F36",
    "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/557601373_1238859314938714_1098843981473178821_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeHViFSUtM5VTPkn3b7TafslYYMGTL6CjplhgwZMvoKOmR5t2GnrP1ZOVwnuLuPY54m1cT0YwQryhNPdjRXZitav&_nc_ohc=eCmog-gnVQQQ7kNvwGg-xsm&_nc_oc=Adlgk0wgu6uWfYQZnZkVo8Ev9eGCLtmiE3qK345CP2PYfl_Zo4bG4lzqqSIat7j66uw&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=jppj-b4BpiRAoBi4lYY5yg&oh=00_Afo8LqbmRWdiPbgE1RhyWmiiRmZCvG4jR0RLZCcvzsH3ZA&oe=696F7200",
    "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/533007243_1193677692790210_9174623503098667227_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=108&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeExXMHKICGaOPcmMfZLCxDl8xsaHgvXHObzGxoeC9cc5toZSBAUPIbC9QCtud9F3JmCKL_ND3ql-vu9wf606Pwq&_nc_ohc=BTbfwojv3xIQ7kNvwGTWGzy&_nc_oc=AdkILd4zWAQief49MNTGAtDfzWxU0ZP8-tuWJmaOKUrilq84gxxrgHfEStU-ueRWnvI&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=DnY68cDrYbKTHDCkPUiByA&oh=00_AfqK8vpBsUf50PZBUeBcVfDduX1mRueHrY091teJUkeGmw&oe=696F868F",
    "https://scontent.fpnh5-2.fna.fbcdn.net/v/t39.30808-6/528204240_1188654826625830_8131890922750338163_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=102&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeFA_2vxbYmP3Z5S-QgK6w96oIBRudTri7iggFG51OuLuIEnLbZTzxSD8DGv-ywZ6TyAni7zWhub1xMAlTjznmtW&_nc_ohc=-IECgJrWx14Q7kNvwF7zpFW&_nc_oc=AdkQPPi8dnsyZcGJulPhUlPP8-80ps20tMn6I6e3JvtrL6Fe7KUpqGVghuAyrafSJKI&_nc_zt=23&_nc_ht=scontent.fpnh5-2.fna&_nc_gid=w_e86DlsM_UGaofQ85fYVw&oh=00_AfomDqv9idTsZQxeSn2NBzkccpIctVudMQ6u_TAzLZYthA&oe=696F8E29",
    "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/510608794_1151202580371055_7283899976815241_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=110&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeHDAiZTCk0BzWmeZ2_vM6LHfgnPdw5i0-R-Cc93DmLT5IwrSNE8lGFnjwDi8OHIRFu4HE37HwAQJUT8UwgvrFwZ&_nc_ohc=n3q3vPLh0ksQ7kNvwGYh1vW&_nc_oc=AdlDDPdk-vSP3J9uTaIAmZLqKz5Y3QZ58VHWGGg1zQyByWACQWUay8jwnNsGUpx6gds&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=ZkIGjfXYpcI4TPW8E_bfNg&oh=00_Afpi3R1XtAJZkF7Ak1GAHjwqAKfxDVhcG1tHZNyc6vvBKw&oe=696F6577",
    "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/512506920_1151202940371019_5985906330710418057_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeEmP5xU_8fz2K88ucZ7vVi2FXDlt74C0KMVcOW3vgLQo0qQyEIFZbWe6D5pfJABxd2IhioI0_OMIdTaiE48lpCU&_nc_ohc=DVJc3KWeaQsQ7kNvwE1r5_6&_nc_oc=Adne8UsbdkNkdzMkcZOSDBmkSjJRJ98eMaJ0i8Y-tO54-EG1l1NwjofIyt28LgQ8za8&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=cDPjQujo5SZgYKGu_7U-Dg&oh=00_AfquEWp_NKMR9WsAJhJtV8Q8jResi5SNfKEG-008YLNT2g&oe=696F8C71",
    "https://scontent.fpnh5-1.fna.fbcdn.net/v/t39.30808-6/508323291_1145619047596075_5198455320111207011_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeG8vcDjQ1rWei78LWFvRO2u9ZdP0O17XuH1l0_Q7Xte4f6U_7tSM2J8tUZAF89M1AESPgd4hODKTDo-FBtU-7Ya&_nc_ohc=f-YQAC3wYQwQ7kNvwHOllS9&_nc_oc=AdlW9Wwoz6n2JbGBsR1f8KwT6GPFhEySJH-snEgp7VKqH1r-GQHwyB5xSPR1fA02qMc&_nc_zt=23&_nc_ht=scontent.fpnh5-1.fna&_nc_gid=vzM0AZ8td7KZbCoCMs3VAg&oh=00_AfqyJ3hIApt7V5wExXmtkGBcD-sfZ4MHzXeep4MuxKYoyg&oe=696F951E",
    "https://scontent.fpnh5-5.fna.fbcdn.net/v/t39.30808-6/508566230_1145617590929554_344641624901097043_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGaAjflbWvSHIR65Xqf2xeyKqWXfni7EtoqpZd-eLsS2l5i2Y6cDq3IPwobkiECYnQW4Llo8z-E0S6I95FvtM18&_nc_ohc=hYnqxJqRER8Q7kNvwEPqqwb&_nc_oc=AdndN9k5r51IPXXM0Cm6IOn9RlFkJl7FztyCNtjp6Kj35KEVgNJYZR0SU9D7Y5EgIP8&_nc_zt=23&_nc_ht=scontent.fpnh5-5.fna&_nc_gid=vcDg2BXlV8l8GQiICmsI0g&oh=00_AfoeUAmx-h7TLyd_IqFEX8Gkmuz60ZTvG_I51RoL2Pd5_w&oe=696F756B",
    "https://scontent.fpnh5-6.fna.fbcdn.net/v/t39.30808-6/510516476_1151203370370976_384403387145784598_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=103&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeFAKonzoxvNotXn7trjv58hcP4E8vNOvXBw_gTy8069cC9ul70bg2Ly8Vnk0mjZlMF3Mfvr-YCIFCM3U0aPwbFE&_nc_ohc=gAItZlOPM3oQ7kNvwG6SsOO&_nc_oc=AdnJY7TzNkMOImCdzZhqC_AgpMxUhcfpzdw74Ou4fq2j66yh0oOe62P9pLk2kSsHQrM&_nc_zt=23&_nc_ht=scontent.fpnh5-6.fna&_nc_gid=DdD0uzFrf7UqZt44z7Ig1A&oh=00_Afqqv_1REjsq1MV7TIu80rHi-i2VoKmu5pC2ALcpeW29Fw&oe=696F62D1",
    "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/558818680_1238859831605329_9033692728136919013_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeE8KzHgGhMhVHrFcIQY1G3y-5KH2fZ4sxX7kofZ9nizFagQ-IcS_Q98YtJjoDJ5xMFbJwjjRGlHnubl-sI0I4X5&_nc_ohc=1OKlnyytXOQQ7kNvwEwFGo-&_nc_oc=AdmKupDLOBJBrBMShq0fVzm_Q47SSziMTeg7r4QUwwgTUPh5OXI6vIfDZEe24Nc445A&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=W7VEYYwgwdWWVG5kP6cqDQ&oh=00_AfpNo4v4Zo3ICoAThaTvZf3I3wc0QJGjvqfZ3CKyUyIiTQ&oe=696F8F36",
    "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/557601373_1238859314938714_1098843981473178821_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s552x414_tt6&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeHViFSUtM5VTPkn3b7TafslYYMGTL6CjplhgwZMvoKOmR5t2GnrP1ZOVwnuLuPY54m1cT0YwQryhNPdjRXZitav&_nc_ohc=eCmog-gnVQQQ7kNvwGg-xsm&_nc_oc=Adlgk0wgu6uWfYQZnZkVo8Ev9eGCLtmiE3qK345CP2PYfl_Zo4bG4lzqqSIat7j66uw&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=jppj-b4BpiRAoBi4lYY5yg&oh=00_Afo8LqbmRWdiPbgE1RhyWmiiRmZCvG4jR0RLZCcvzsH3ZA&oe=696F7200",

  ];

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans overflow-hidden">

      {/* 1. BRANDED HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden border-b border-[#c8c8c8]/30 flex flex-col items-center justify-center bg-white dark:bg-black">

        {/* 1. 3D MARQUEE - Fixed Z-Index and Opacity */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <ThreeDMarquee
            className="h-full w-full opacity-80 dark:opacity-40"
            images={marqueeImages}
          />
        </div>

        {/* 2. OVERLAY - Ensures text is readable without hiding the marquee */}
        <div className="absolute inset-0 z-10 h-full w-full bg-white/40 dark:bg-black/60 backdrop-blur-[1px]" />

        {/* 3. CENTER CONTENT - Higher Z-Index */}
        <section className="relative py-24 dark:bg-zinc-900/10 border-b border-divider overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            <motion.div {...fadeIn} className="flex flex-col items-center leading-none text-center mb-12">
              <h1 className="font-sans font-black tracking-[0.15em] text-[#1D56A5] text-5xl md:text-8xl">TECHNO</h1>
              <div className="flex flex-wrap items-center justify-center gap-x-4 mt-4">
                <h2 className="font-sans font-bold tracking-tight text-[#1D56A5] text-2xl md:text-5xl">INNOVATION</h2>
                <div className="bg-[#78D3D2] rounded-2xl px-6 py-2 flex items-center justify-center shadow-lg">
                  <h2 className="font-sans font-bold text-white tracking-tight text-2xl md:text-5xl uppercase">Challenge</h2>
                </div>
              </div>
              <h1 className="font-sans font-black tracking-[0.15em] text-[#1D56A5] text-4xl md:text-7xl mt-4">CAMBODIA</h1>
            </motion.div>
            <p className="text-lg md:text-2xl text-slate-500 dark:text-zinc-400 max-w-3xl mx-auto font-medium leading-relaxed italic">
              Organized by GIC "Activating student potential through leadership, creativity, and world-class technical innovation."
            </p>
          </div>
        </section>
        {/* Decorative Corner Glow */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#007d49]/10 blur-[120px] rounded-full pointer-events-none z-10" />
      </section>

      {/* 2. CORE OBJECTIVES SECTION */}
      <section className="py-24 border-b border-[#c8c8c8]/30 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-8 border-b-8 border-[#c8c8c8] inline-block pb-2">Our <span className="text-[#007d49]">Objectives</span></h2>
              <p className="text-lg text-slate-600 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
                TIC aims to be the vibrant platform where Young Cambodian Students activate their potential
                and move their leadership, creativity, and innovation to the next level.
              </p>

              <div className="space-y-6">
                <ObjectiveItem
                  icon={<Target className="text-[#007d49]" />}
                  title="Reveal Potential"
                  desc="Showcase student excellence to stakeholders, ministries, and interested industrial bodies."
                />
                <ObjectiveItem
                  icon={<Zap className="text-[#007d49]" />}
                  title="Promote STEM Entrepreneurship"
                  desc="Drive technical and business innovation within Engineering and Technology tracks."
                />
                <ObjectiveItem
                  icon={<Lightbulb className="text-[#007d49]" />}
                  title="Real World Solutions"
                  desc="Utilize student skills to solve real-world problems through STEM-based innovation."
                />
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="relative">
              <div className="p-12 rounded-[4rem] bg-[#c8c8c8]/20 dark:bg-zinc-900 border border-[#c8c8c8]/50 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                    <History className="text-[#007d49]" /> Competition Ecosystem
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed mb-8">
                    We bring together students, mentors, and investors to create a cycle of
                    continuous innovation and industrial readiness.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800 border border-[#c8c8c8] flex flex-col items-center text-center shadow-sm">
                      <Presentation className="text-[#007d49] mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Leadership</span>
                    </div>
                    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800 border border-[#c8c8c8] flex flex-col items-center text-center shadow-sm">
                      <PenTool className="text-[#007d49] mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Creativity</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PARTNERS & MINISTRIES */}
      <section className="py-24 bg-[#c8c8c8]/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-3xl font-black uppercase tracking-widest text-[#007d49] mb-4">Ecosystem Partners</h2>
            <Divider className="w-24 mx-auto bg-[#c8c8c8] h-1.5 rounded-full" />
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-12 opacity-80 hover:opacity-100 transition-opacity">
            {partners.map((p, i) => (
              <Tooltip key={i} content={p.role} placement="bottom">
                <Image src={p.img} width={110} height={110} alt={p.name} className=" hover:grayscale-0 transition-all duration-500" />
              </Tooltip>
            ))}
          </div>

          <p className="mt-16 text-[10px] font-black uppercase tracking-[0.3em] text-[#007d49]/60">Supported by National Institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-12 mt-8">
            {ministries.map((p, i) => (
              <Tooltip key={i} content={p.role} placement="bottom">
                <Image src={p.img} width={110} height={110} alt={p.name} className=" hover:grayscale-0 transition-all duration-500" />
              </Tooltip>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE 2025 ROADMAP */}
      <section className="py-24 bg-white dark:bg-zinc-950 rounded-[4rem] mx-4 md:mx-6 shadow-inner">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 border-l-8 border-[#007d49] pl-6">Program <span className="text-[#007d49]">Roadmap</span></h2>
            <p className="text-slate-500 font-medium">The official 2025 timeline from registration to pre-incubation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {ticRoadmap.map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl ${item.color} mb-6 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform relative z-10`}>
                  <Calendar size={24} />
                </div>
                <h4 className="font-black text-sm uppercase mb-1 tracking-widest text-[#007d49]">{item.stage}</h4>
                <p className="text-[10px] font-bold text-slate-400 mb-3">{item.date}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed px-4 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function ObjectiveItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-6 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-[#c8c8c8] hover:shadow-lg hover:border-[#007d49] transition-all group">
      <div className="shrink-0 p-3 bg-[#c8c8c8]/20 rounded-2xl group-hover:bg-[#007d49] group-hover:text-white transition-colors">{icon}</div>
      <div>
        <h4 className="text-lg font-black tracking-tight mb-2 uppercase group-hover:text-[#007d49] transition-colors">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}