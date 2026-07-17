import menstrualImg from "@/assets/menstrual-massager.jpg";
import kneeImg from "@/assets/knee-massager.jpg";
import neckImg from "@/assets/neck-massager.jpg";

export type ProductSlug = "menstrual" | "knee" | "neck";

export interface Product {
  slug: ProductSlug;
  name: string;
  subtitle: string;
  tagline: string;
  shortDefinition: string;
  price: number;
  comparePrice: number;
  image: string;
  badge?: string;
  featured?: boolean;
  colors: string[];
  intensities: string[];
  bullets: string[];
  reviews: { rating: number; count: number };
  howToUse: string[];
  specs: { label: string; value: string }[];
  shipping: string[];
  science: {
    inside: { title: string; body: string }[];
    helps: string[];
  };
}

export const products: Record<ProductSlug, Product> = {
  menstrual: {
    slug: "menstrual",
    name: "Aura Menstrual Relief Belt",
    subtitle: "Warming vibration therapy for cramp-free days",
    tagline: "Cordless heat + pulse for period comfort",
    shortDefinition:
      "A discreet, ergonomic waist belt that pairs smart heat with rhythmic vibration to melt away menstrual cramps in minutes — worn comfortably under clothing.",
    price: 89,
    comparePrice: 119,
    image: menstrualImg,
    badge: "Bestseller",
    featured: true,
    colors: ["Blush", "Pearl", "Aubergine"],
    intensities: ["Soothe", "Relieve", "Deep"],
    bullets: [
      "3-level smart heat up to 60°C",
      "4 rhythmic vibration modes",
      "Ergonomic fit, wear under clothing",
      "8-hour cordless battery",
    ],
    reviews: { rating: 4.9, count: 12480 },
    howToUse: [
      "Wrap the belt around your lower abdomen and fasten to a snug fit.",
      "Press the power button — hold to cycle heat, tap to cycle vibration.",
      "Start with Soothe mode for 15 minutes; layer in vibration as needed.",
      "Recharge via USB-C. One charge lasts a full cycle.",
    ],
    specs: [
      { label: "Heat range", value: "45°C – 60°C" },
      { label: "Battery", value: "2000 mAh · up to 8h" },
      { label: "Weight", value: "260 g" },
      { label: "Waist size", value: "24 in – 47 in" },
      { label: "Charging", value: "USB-C · 2h full charge" },
    ],
    shipping: [
      "Free express shipping over $75",
      "30-day risk-free trial",
      "1-year warranty · lifetime support",
    ],
    science: {
      inside: [
        {
          title: "NTC Smart Temperature Control",
          body: "Graphene heating film with a precision thermistor keeps warmth steady within ±1°C — never too hot, never fading.",
        },
        {
          title: "Multi-Frequency Vibration Motors",
          body: "Two silent motors deliver overlapping pulse patterns tuned to the frequency range clinicians use for cramp relief.",
        },
      ],
      helps: [
        "Relieves uterine cramping in minutes",
        "Improves local blood circulation",
        "Decreases abdominal tension — medication-free",
      ],
    },
  },
  knee: {
    slug: "knee",
    name: "Halo Knee Recovery Wrap",
    subtitle: "Infrared heat + air compression for joint relief",
    tagline: "Clinical-grade knee therapy, cordless",
    shortDefinition:
      "A cordless wrap that combines deep infrared heat, gentle air compression, and vibration nodes to soothe stiffness and accelerate recovery around the knee.",
    price: 129,
    comparePrice: 169,
    image: kneeImg,
    colors: ["Blush", "Sand"],
    intensities: ["Light", "Medium", "Deep"],
    bullets: [
      "Infrared heat + air compression",
      "3 vibration recovery modes",
      "One-size adjustable strap",
      "Whisper-quiet, lightweight design",
    ],
    reviews: { rating: 4.8, count: 6820 },
    howToUse: [
      "Center the wrap over your kneecap and secure the top and bottom straps.",
      "Power on — hold to toggle heat, tap to cycle compression + vibration.",
      "Use for 15–20 minutes, up to twice daily.",
      "Charge via USB-C between sessions.",
    ],
    specs: [
      { label: "Heat range", value: "40°C – 55°C" },
      { label: "Battery", value: "2500 mAh · up to 4h" },
      { label: "Fit", value: "12 in – 22 in circumference" },
      { label: "Weight", value: "380 g" },
      { label: "Charging", value: "USB-C · 2.5h full charge" },
    ],
    shipping: [
      "Free express shipping over $75",
      "30-day risk-free trial",
      "1-year warranty",
    ],
    science: {
      inside: [
        {
          title: "Infrared Heat Matrix",
          body: "Far-infrared elements penetrate deeper than surface warmth, reaching the tissue around the joint capsule.",
        },
        {
          title: "Air Compression Bags",
          body: "Twin bladders inflate rhythmically to encourage lymphatic flow and reduce fluid buildup after activity.",
        },
        {
          title: "Joint Vibration Nodes",
          body: "Four low-frequency nodes ring the patella, releasing tight surrounding tissue without pressing on the joint.",
        },
      ],
      helps: [
        "Soothes stiffness in the joint capsule",
        "Alleviates strain from standing or running",
        "Accelerates recovery after physical activity",
      ],
    },
  },
  neck: {
    slug: "neck",
    name: "Ciel Cervical Neck Massager",
    subtitle: "TENS micro-current + gentle thermal compress",
    tagline: "Melt away screen-neck tension",
    shortDefinition:
      "A whisper-light neck ring using TENS/EMS micro-current pulses and a 42°C thermal compress to release the deep trapezius muscles that carry your day.",
    price: 99,
    comparePrice: 139,
    image: neckImg,
    colors: ["Blush", "Ivory", "Charcoal"],
    intensities: ["Gentle", "Balance", "Intense"],
    bullets: [
      "6 pulse modes · 15 intensity levels",
      "Constant 42°C thermal compress",
      "Ergonomic weightless fit (180 g)",
      "One-tap remote control",
    ],
    reviews: { rating: 4.9, count: 9340 },
    howToUse: [
      "Rest the ring on the base of your neck; electrodes should touch skin.",
      "Power on and choose a pulse mode with the remote.",
      "Start at intensity 3–5. Ramp up until you feel a firm, comfortable pulse.",
      "Sessions of 15 minutes, morning or after work.",
    ],
    specs: [
      { label: "Heat", value: "Constant 42°C" },
      { label: "Battery", value: "1200 mAh · 180 min use" },
      { label: "Weight", value: "180 g" },
      { label: "Modes", value: "6 pulse × 15 levels" },
      { label: "Charging", value: "USB-C · 90 min" },
    ],
    shipping: [
      "Free express shipping over $75",
      "30-day risk-free trial",
      "1-year warranty",
    ],
    science: {
      inside: [
        {
          title: "TENS/EMS Micro-current Pulse",
          body: "Skin-safe electrical pulses stimulate nerve endings and gently contract muscle fibers, mimicking a therapist's kneading.",
        },
        {
          title: "42°C Thermal Compress",
          body: "A ceramic heating strip holds a constant, skin-loving warmth that opens circulation into the deep neck muscles.",
        },
      ],
      helps: [
        "Relieves neck tightness from screens and posture",
        "Softens the deep trapezius muscles",
        "Reduces tension headaches at the source",
      ],
    },
  },
};

export const productList: Product[] = [products.knee, products.menstrual, products.neck];
