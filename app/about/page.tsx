'use client';

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
    ArrowRight,
    Clock3,
    ShieldCheck,
    Award,
    Users,
    Star,
    Truck,
    MapPin,
    GraduationCap,
    Package,
    Building2,
    Utensils,
    ChefHat,
    Heart,
    Sparkles,
} from "lucide-react";

export default function AboutPage() {

    const stats = [
        {
            number: "500+",
            title: "Happy Customers",
            icon: <Users className="text-orange-500" size={24} />,
        },
        {
            number: "30min",
            title: "Avg Delivery Time",
            icon: <Clock3 className="text-orange-500" size={24} />,
        },
        {
            number: "20+",
            title: "Menu Options",
            icon: <Utensils className="text-orange-500" size={24} />,
        },
        {
            number: "100%",
            title: "Fresh Ingredients",
            icon: <ShieldCheck className="text-orange-500" size={24} />,
        },
    ];

    const services = [
        {
            icon: <ChefHat className="text-orange-500" size={32} />,
            title: "Quality Cooking",
            description: "Expertly prepared meals using premium ingredients and traditional recipes.",
        },
        {
            icon: <Package className="text-orange-500" size={32} />,
            title: "Food Production",
            description: "Mass production of delicious, hygienic meals for individuals and families.",
        },
        {
            icon: <Building2 className="text-orange-500" size={32} />,
            title: "Modern Kitchen",
            description: "State-of-the-art kitchen facilities ensuring food safety and quality.",
        },
        {
            icon: <Truck className="text-orange-500" size={32} />,
            title: "Reliable Delivery",
            description: "Fast and professional delivery service across Rivers State.",
        },
        {
            icon: <GraduationCap className="text-orange-500" size={32} />,
            title: "Culinary Excellence",
            description: "Skilled chefs passionate about creating memorable dining experiences.",
        },
        {
            icon: <Heart className="text-orange-500" size={32} />,
            title: "Customer First",
            description: "Committed to exceeding customer expectations with every order.",
        },
    ];

    const values = [
        {
            icon: <ShieldCheck className="text-orange-500" size={24} />,
            title: "Quality Assurance",
            description: "Every meal meets strict quality standards using fresh ingredients.",
        },
        {
            icon: <Clock3 className="text-orange-500" size={24} />,
            title: "Timely Service",
            description: "Reliable and punctual delivery to ensure customer satisfaction.",
        },
        {
            icon: <Users className="text-orange-500" size={24} />,
            title: "Community Focus",
            description: "Creating opportunities and serving our community with excellence.",
        },
        {
            icon: <Star className="text-orange-500" size={24} />,
            title: "Customer Satisfaction",
            description: "Your happiness is our priority in everything we do.",
        },
    ];

    return (
        <>

            <Navbar />

            <main className="bg-zinc-950 text-white">

                {/* ====================================== */}
                {/* HERO */}
                {/* ====================================== */}

                <section className="relative overflow-hidden">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,.08),transparent_40%)]" />

                    <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

                        <div className="grid lg:grid-cols-2 gap-12 items-center">

                            {/* LEFT */}

                            <div>

                                <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-orange-400 text-sm font-semibold">
                                    <Sparkles className="w-4 h-4" />
                                    Welcome to PEF-HUB
                                </span>

                                <h1 className="mt-6 text-4xl lg:text-6xl font-black leading-tight">

                                    Where Great Food
                                    <span className="text-orange-500">
                                        {" "}Meets Excellence
                                    </span>

                                </h1>

                                <p className="mt-6 text-zinc-400 leading-7 text-base">

                                    Priceless and Elegant Food HUB (PEF-HUB) uses culinary skills in cooking, baking, and grilling to deliver excellent and top-notch services to individuals and families seeking quick and satisfying meals in a welcoming atmosphere.

                                </p>

                                <div className="flex flex-wrap gap-4 mt-8">

                                    <Link
                                        href="/menu"
                                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-semibold transition hover:scale-105 active:scale-95"
                                    >

                                        Explore Menu

                                        <ArrowRight size={18} />

                                    </Link>

                                    <Link
                                        href="/contact"
                                        className="px-6 py-3 rounded-xl border border-zinc-700 hover:border-orange-500 hover:text-orange-500 transition"
                                    >

                                        Contact Us

                                    </Link>

                                </div>

                            </div>

                            {/* RIGHT */}

                            <div>

                                <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">

                                    <Image
                                        src="/images/about-hero.png"
                                        alt="PEF-HUB Restaurant"
                                        width={700}
                                        height={700}
                                        className="w-full h-full object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />

                                    {/* Location Badge */}

                                    <div className="absolute bottom-4 left-4 rounded-xl bg-zinc-950/90 backdrop-blur border border-zinc-700 px-4 py-2.5 flex items-center gap-3">

                                        <MapPin className="text-orange-500" size={18} />

                                        <div>

                                            <p className="text-[10px] text-zinc-400 uppercase tracking-wider">

                                                Located In

                                            </p>

                                            <p className="text-sm font-semibold">

                                                Ogbogu, ONELGA

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* ====================================== */}
                {/* STATISTICS */}
                {/* ====================================== */}

                <section className="border-y border-zinc-900 bg-zinc-900/30">

                    <div className="max-w-7xl mx-auto px-6 py-12">

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                            {stats.map((item) => (

                                <div
                                    key={item.title}
                                    className="text-center bg-zinc-950 rounded-2xl border border-zinc-800 p-6 hover:border-orange-500/50 transition duration-300 hover:-translate-y-1"
                                >

                                    <div className="flex justify-center mb-2">

                                        {item.icon}

                                    </div>

                                    <h2 className="text-3xl font-black text-orange-500">

                                        {item.number}

                                    </h2>

                                    <p className="text-zinc-400 mt-1 text-sm">

                                        {item.title}

                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                </section>

                {/* ====================================== */}
                {/* OUR STORY */}
                {/* ====================================== */}

                <section className="max-w-7xl mx-auto px-6 py-20">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Image */}

                        <div className="relative">

                            <div className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">

                                <Image
                                    src="/images/our-story.png"
                                    alt="PEF-HUB Kitchen"
                                    width={700}
                                    height={800}
                                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                            </div>

                            <div className="absolute -bottom-6 -right-6 hidden md:block rounded-2xl bg-orange-500 p-4 shadow-2xl">

                                <h3 className="text-xl font-black text-white">
                                    Since
                                </h3>

                                <p className="text-2xl font-black text-white mt-1">
                                    2023
                                </p>

                            </div>

                        </div>

                        {/* Right */}

                        <div>

                            <span className="rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-sm font-semibold text-orange-400">

                                OUR STORY

                            </span>

                            <h2 className="mt-4 text-3xl lg:text-4xl font-black leading-tight">

                                Delivering Excellence
                                <span className="text-orange-500">
                                    {" "}Through Food
                                </span>

                            </h2>

                            <p className="mt-6 text-zinc-400 leading-7">

                                Priceless and Elegant Food HUB (PEF-HUB) was established to provide quality fast food, restaurant, and culinary services in Ogbogu, ONELGA, Rivers State.

                            </p>

                            <p className="mt-4 text-zinc-400 leading-7">

                                Our region is experiencing rapid growth, and PEF-HUB fills the gap by providing premium food production, processing, and distribution services with excellence and professionalism.

                            </p>

                            <p className="mt-4 text-zinc-400 leading-7">

                                We combine culinary expertise with values of stewardship, dignity of labour, and community service to deliver delicious, affordable meals while creating opportunities for young people in food production.

                            </p>

                        </div>

                    </div>

                </section>

                {/* ====================================== */}
                {/* MISSION & VISION */}
                {/* ====================================== */}

                <section className="bg-zinc-900/40 border-y border-zinc-800">

                    <div className="max-w-7xl mx-auto px-6 py-20">

                        <div className="text-center mb-12">

                            <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm">

                                What Drives Us

                            </span>

                            <h2 className="mt-3 text-3xl lg:text-4xl font-black">

                                Our Mission & Vision

                            </h2>

                            <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">

                                Everything we do revolves around quality food production, customer satisfaction, and community impact.

                            </p>

                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">

                            {/* Mission */}

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 hover:border-orange-500 transition duration-300 hover:-translate-y-1">

                                <Award className="text-orange-500 mb-4" size={36} />

                                <h3 className="text-2xl font-black">

                                    Our Mission

                                </h3>

                                <p className="mt-4 text-zinc-400 leading-7">

                                    To deliver quality food production, fair pricing, and timely delivery of our products and services while creating sustainable employment opportunities for young people in food production and culinary services.

                                </p>

                            </div>

                            {/* Vision */}

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 hover:border-orange-500 transition duration-300 hover:-translate-y-1">

                                <Star className="text-orange-500 mb-4" size={36} />

                                <h3 className="text-2xl font-black">

                                    Our Vision

                                </h3>

                                <p className="mt-4 text-zinc-400 leading-7">

                                    To become Rivers State's most trusted food hub, delivering excellence through culinary innovation, professional training, and community-focused service.

                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* ====================================== */}
                {/* SERVICES */}
                {/* ====================================== */}

                <section className="max-w-7xl mx-auto px-6 py-20">

                    <div className="text-center mb-12">

                        <span className="text-orange-500 uppercase tracking-widest font-semibold text-sm">

                            Our Services

                        </span>

                        <h2 className="mt-3 text-3xl lg:text-4xl font-black">

                            What We Offer

                        </h2>

                        <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">

                            We provide comprehensive food services with a commitment to quality, taste, and customer satisfaction.

                        </p>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {services.map((service) => (

                            <div
                                key={service.title}
                                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 hover:border-orange-500 transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/5"
                            >

                                <div className="p-2.5 rounded-xl bg-orange-500/10 w-fit">

                                    {service.icon}

                                </div>

                                <h3 className="mt-4 font-bold text-lg">

                                    {service.title}

                                </h3>

                                <p className="mt-2 text-zinc-400 leading-6 text-sm">

                                    {service.description}

                                </p>

                            </div>

                        ))}

                    </div>

                </section>

                {/* ====================================== */}
                {/* OUR VALUES */}
                {/* ====================================== */}

                <section className="bg-zinc-900/40 border-y border-zinc-800">

                    <div className="max-w-7xl mx-auto px-6 py-20">

                        <div className="text-center mb-12">

                            <span className="text-orange-500 uppercase tracking-widest font-semibold text-sm">

                                Our Core Values

                            </span>

                            <h2 className="mt-3 text-3xl lg:text-4xl font-black">

                                What We Stand For

                            </h2>

                            <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">

                                These values guide everything we do at PEF-HUB.

                            </p>

                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                            {values.map((value) => (

                                <div
                                    key={value.title}
                                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 hover:border-orange-500 transition duration-300 hover:-translate-y-1"
                                >

                                    <div className="p-2 rounded-xl bg-orange-500/10 w-fit">

                                        {value.icon}

                                    </div>

                                    <h3 className="mt-3 font-bold text-lg">

                                        {value.title}

                                    </h3>

                                    <p className="mt-2 text-zinc-400 leading-6 text-sm">

                                        {value.description}

                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                </section>

                {/* ====================================== */}
                {/* CALL TO ACTION - NO BOTTOM PADDING */}
                {/* ====================================== */}

                <section className="max-w-7xl mx-auto px-6 pt-20 pb-0">

                    <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 p-8 md:p-12">

                        <div className="text-center">

                            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur text-white">
                                <Sparkles className="w-4 h-4" />
                                Ready To Order?
                            </span>

                            <h2 className="mt-4 text-2xl md:text-4xl font-black text-white">
                                Quality Food, Fair Price, Timely Delivery.
                            </h2>

                            <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-orange-100 leading-6">
                                Order delicious meals, host events, or partner with us for culinary services. PEF-HUB is here to serve you with excellence.
                            </p>

                            <div className="mt-6 flex flex-wrap justify-center gap-4">

                                <Link
                                    href="/menu"
                                    className="rounded-xl bg-white px-6 py-2.5 font-semibold text-orange-600 transition hover:scale-105 hover:shadow-2xl text-sm"
                                >
                                    Explore Menu
                                </Link>

                                <Link
                                    href="/contact"
                                    className="rounded-xl border border-white/40 px-6 py-2.5 font-semibold text-white transition hover:bg-white/10 hover:scale-105 text-sm"
                                >
                                    Contact Us
                                </Link>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />

        </>

    );
}