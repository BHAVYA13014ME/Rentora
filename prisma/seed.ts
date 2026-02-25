import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Helper to generate sequential IDs
let counter = 0;
function id(prefix: string) {
  counter++;
  return `${prefix}_${String(counter).padStart(4, "0")}`;
}

async function main() {
  console.log("🌱 Starting seed...\n");

  // ─── CLEAN ALL TABLES ──────────────────────────────────────────
  console.log("🗑️  Cleaning existing data...");
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.taxConfig.deleteMany();
  await prisma.systemSettings.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await (prisma as any).return.deleteMany();
  await prisma.pickup.deleteMany();
  await prisma.rentalOrderItem.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.rentalOrder.deleteMany();
  await prisma.quotationItem.deleteMany();
  await prisma.quotation.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.rentalPricing.deleteMany();
  await prisma.productVariantAttribute.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productAttributeValue.deleteMany();
  await prisma.productAttribute.deleteMany();
  await prisma.category.deleteMany();
  await prisma.vendorProfile.deleteMany();
  await prisma.address.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.token.deleteMany();
  await prisma.user.deleteMany();

  // ─── PASSWORD HASH ─────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("Password@123", 10);

  // ═══════════════════════════════════════════════════════════════
  //  1. USERS (Admin + Vendors + Customers)
  // ═══════════════════════════════════════════════════════════════
  console.log("👤 Creating Users...");

  const admin = await prisma.user.create({
    data: {
      id: "admin_001",
      firstName: "Rahul",
      lastName: "Sharma",
      email: "admin@rentora.com",
      emailVerified: new Date(),
      password: hashedPassword,
      role: "ADMIN",
      phone: "+91-9876543210",
      companyName: "Rentora Platform",
      gstin: "07AABCU9603R1ZM",
      isActive: true,
    },
  });

  const vendors = await Promise.all([
    prisma.user.create({
      data: {
        id: "vendor_001",
        firstName: "Amit",
        lastName: "Patel",
        email: "amit@rentequip.com",
        emailVerified: new Date(),
        password: hashedPassword,
        role: "VENDOR",
        phone: "+91-9812345670",
        companyName: "RentEquip India",
        gstin: "24AABCP1234R1Z5",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "vendor_002",
        firstName: "Priya",
        lastName: "Nair",
        email: "priya@techrent.in",
        emailVerified: new Date(),
        password: hashedPassword,
        role: "VENDOR",
        phone: "+91-9823456780",
        companyName: "TechRent Solutions",
        gstin: "29AABCT5678R1Z2",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "vendor_003",
        firstName: "Suresh",
        lastName: "Reddy",
        email: "suresh@heavymachines.com",
        emailVerified: new Date(),
        password: hashedPassword,
        role: "VENDOR",
        phone: "+91-9834567890",
        companyName: "Heavy Machines Co.",
        gstin: "36AABCH9012R1Z8",
        isActive: true,
      },
    }),
  ]);

  const customers = await Promise.all([
    prisma.user.create({
      data: {
        id: "cust_001",
        firstName: "Vikram",
        lastName: "Singh",
        email: "vikram@gmail.com",
        emailVerified: new Date(),
        password: hashedPassword,
        role: "CUSTOMER",
        phone: "+91-9845678901",
        companyName: "Singh Constructions",
        gstin: "09AABCS3456R1Z1",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "cust_002",
        firstName: "Neha",
        lastName: "Gupta",
        email: "neha@outlook.com",
        emailVerified: new Date(),
        password: hashedPassword,
        role: "CUSTOMER",
        phone: "+91-9856789012",
        companyName: "Gupta Events",
        gstin: "07AABCG7890R1Z4",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "cust_003",
        firstName: "Arjun",
        lastName: "Mehta",
        email: "arjun@company.com",
        emailVerified: new Date(),
        password: hashedPassword,
        role: "CUSTOMER",
        phone: "+91-9867890123",
        companyName: "Mehta IT Solutions",
        gstin: "27AABCM1234R1Z7",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "cust_004",
        firstName: "Kavita",
        lastName: "Joshi",
        email: "kavita@yahoo.com",
        emailVerified: new Date(),
        password: hashedPassword,
        role: "CUSTOMER",
        phone: "+91-9878901234",
        companyName: "Joshi Photography",
        gstin: "06AABCJ5678R1Z3",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "cust_005",
        firstName: "Rohan",
        lastName: "Kumar",
        email: "rohan@gmail.com",
        emailVerified: new Date(),
        password: hashedPassword,
        role: "CUSTOMER",
        phone: "+91-9889012345",
        companyName: "Kumar Logistics",
        gstin: "33AABCK9012R1Z6",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "cust_006",
        firstName: "Sneha",
        lastName: "Rao",
        email: "sneha@hotmail.com",
        emailVerified: new Date(),
        password: hashedPassword,
        role: "CUSTOMER",
        phone: "+91-9890123456",
        companyName: "Rao Interiors",
        gstin: "29AABCR3456R1Z9",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "cust_007",
        firstName: "Deepak",
        lastName: "Verma",
        email: "deepak@gmail.com",
        emailVerified: new Date(),
        password: hashedPassword,
        role: "CUSTOMER",
        phone: "+91-9901234567",
        companyName: "Verma Builders",
        gstin: "10AABCV7890R1Z2",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        id: "cust_008",
        firstName: "Ananya",
        lastName: "Das",
        email: "ananya@gmail.com",
        emailVerified: new Date(),
        password: hashedPassword,
        role: "CUSTOMER",
        phone: "+91-9912345678",
        companyName: "Das Media",
        gstin: "19AABCD1234R1Z5",
        isActive: true,
      },
    }),
  ]);

  // ═══════════════════════════════════════════════════════════════
  //  2. VENDOR PROFILES
  // ═══════════════════════════════════════════════════════════════
  console.log("🏢 Creating Vendor Profiles...");

  await Promise.all([
    prisma.vendorProfile.create({
      data: {
        id: "vp_001",
        userId: "vendor_001",
        businessName: "RentEquip India Pvt. Ltd.",
        businessEmail: "contact@rentequip.com",
        businessPhone: "+91-22-44556677",
        gstNumber: "24AABCP1234R1Z5",
        panNumber: "AABCP1234R",
        bankAccountNo: "1234567890123456",
        bankIfscCode: "HDFC0001234",
        bankName: "HDFC Bank",
        addressLine1: "101 Trade Center, Andheri East",
        addressLine2: "Near Metro Station",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400069",
        country: "India",
        website: "https://rentequip.com",
        commissionRate: 8,
        isVerified: true,
      },
    }),
    prisma.vendorProfile.create({
      data: {
        id: "vp_002",
        userId: "vendor_002",
        businessName: "TechRent Solutions Pvt. Ltd.",
        businessEmail: "info@techrent.in",
        businessPhone: "+91-80-55667788",
        gstNumber: "29AABCT5678R1Z2",
        panNumber: "AABCT5678R",
        bankAccountNo: "9876543210987654",
        bankIfscCode: "ICIC0005678",
        bankName: "ICICI Bank",
        addressLine1: "45 Tech Park, Whitefield",
        addressLine2: "Block C, 3rd Floor",
        city: "Bangalore",
        state: "Karnataka",
        postalCode: "560066",
        country: "India",
        website: "https://techrent.in",
        commissionRate: 10,
        isVerified: true,
      },
    }),
    prisma.vendorProfile.create({
      data: {
        id: "vp_003",
        userId: "vendor_003",
        businessName: "Heavy Machines Co. Ltd.",
        businessEmail: "sales@heavymachines.com",
        businessPhone: "+91-40-66778899",
        gstNumber: "36AABCH9012R1Z8",
        panNumber: "AABCH9012R",
        bankAccountNo: "5678901234567890",
        bankIfscCode: "SBIN0009012",
        bankName: "State Bank of India",
        addressLine1: "Industrial Area Phase 2",
        addressLine2: "Plot 78, Sector 5",
        city: "Hyderabad",
        state: "Telangana",
        postalCode: "500032",
        country: "India",
        website: "https://heavymachines.com",
        commissionRate: 12,
        isVerified: true,
      },
    }),
  ]);

  // ═══════════════════════════════════════════════════════════════
  //  3. ADDRESSES
  // ═══════════════════════════════════════════════════════════════
  console.log("📍 Creating Addresses...");

  const addressData = [
    { id: "addr_001", userId: "cust_001", label: "Office", addressLine1: "42 MG Road, Sector 14", city: "Noida", state: "Uttar Pradesh", postalCode: "201301", isDefault: true },
    { id: "addr_002", userId: "cust_001", label: "Site", addressLine1: "Plot 18, Industrial Area", city: "Ghaziabad", state: "Uttar Pradesh", postalCode: "201009", isDefault: false },
    { id: "addr_003", userId: "cust_002", label: "Office", addressLine1: "55 Connaught Place", city: "New Delhi", state: "Delhi", postalCode: "110001", isDefault: true },
    { id: "addr_004", userId: "cust_002", label: "Home", addressLine1: "B-204 Green Park Apartments", city: "New Delhi", state: "Delhi", postalCode: "110016", isDefault: false },
    { id: "addr_005", userId: "cust_003", label: "Office", addressLine1: "Tech Hub, Bandra Kurla Complex", city: "Mumbai", state: "Maharashtra", postalCode: "400051", isDefault: true },
    { id: "addr_006", userId: "cust_004", label: "Studio", addressLine1: "12 Park Street", city: "Kolkata", state: "West Bengal", postalCode: "700016", isDefault: true },
    { id: "addr_007", userId: "cust_005", label: "Warehouse", addressLine1: "789 Poonamallee Road", city: "Chennai", state: "Tamil Nadu", postalCode: "600056", isDefault: true },
    { id: "addr_008", userId: "cust_006", label: "Office", addressLine1: "33 MG Road, Kochi", city: "Kochi", state: "Kerala", postalCode: "682016", isDefault: true },
    { id: "addr_009", userId: "cust_007", label: "Site HQ", addressLine1: "24 Civil Lines", city: "Jaipur", state: "Rajasthan", postalCode: "302001", isDefault: true },
    { id: "addr_010", userId: "cust_008", label: "Studio", addressLine1: "88 HSR Layout, 5th Sector", city: "Bangalore", state: "Karnataka", postalCode: "560102", isDefault: true },
  ];

  for (const addr of addressData) {
    await prisma.address.create({
      data: { ...addr, country: "India" },
    });
  }

  // ═══════════════════════════════════════════════════════════════
  //  4. CATEGORIES (with hierarchy)
  // ═══════════════════════════════════════════════════════════════
  console.log("📂 Creating Categories...");

  // Parent categories
  const parentCats = [
    { id: "cat_001", name: "Construction Equipment", slug: "construction-equipment", description: "Heavy and light construction machinery for building & infrastructure projects" },
    { id: "cat_002", name: "IT & Electronics", slug: "it-electronics", description: "Computers, laptops, projectors, and electronic devices" },
    { id: "cat_003", name: "Event & Party", slug: "event-party", description: "Event management equipment, sound systems, and decor" },
    { id: "cat_004", name: "Photography & Video", slug: "photography-video", description: "Cameras, lenses, lighting, and video production equipment" },
    { id: "cat_005", name: "Industrial Tools", slug: "industrial-tools", description: "Power tools, hand tools, and industrial equipment" },
    { id: "cat_006", name: "Office Equipment", slug: "office-equipment", description: "Furniture, printers, copiers, and office essentials" },
  ];

  for (const cat of parentCats) {
    await prisma.category.create({ data: { ...cat, isActive: true } });
  }

  // Sub-categories
  const subCats = [
    { id: "cat_011", name: "Excavators", slug: "excavators", parentId: "cat_001", description: "Mini and full-size excavators" },
    { id: "cat_012", name: "Concrete Mixers", slug: "concrete-mixers", parentId: "cat_001", description: "Portable and industrial concrete mixers" },
    { id: "cat_013", name: "Scaffolding", slug: "scaffolding", parentId: "cat_001", description: "Steel and aluminum scaffolding systems" },
    { id: "cat_021", name: "Laptops", slug: "laptops", parentId: "cat_002", description: "Business and gaming laptops" },
    { id: "cat_022", name: "Projectors", slug: "projectors", parentId: "cat_002", description: "HD and 4K projectors" },
    { id: "cat_023", name: "Servers & Networking", slug: "servers-networking", parentId: "cat_002", description: "Server racks, switches, and networking gear" },
    { id: "cat_031", name: "Sound Systems", slug: "sound-systems", parentId: "cat_003", description: "Speakers, mixers, and PA systems" },
    { id: "cat_032", name: "Lighting", slug: "lighting", parentId: "cat_003", description: "Stage lighting, LED panels, and fixtures" },
    { id: "cat_041", name: "DSLR Cameras", slug: "dslr-cameras", parentId: "cat_004", description: "Professional DSLR cameras" },
    { id: "cat_042", name: "Drones", slug: "drones", parentId: "cat_004", description: "Photography and videography drones" },
    { id: "cat_051", name: "Power Drills", slug: "power-drills", parentId: "cat_005", description: "Cordless and corded drilling machines" },
    { id: "cat_052", name: "Welding Machines", slug: "welding-machines", parentId: "cat_005", description: "ARC, MIG, TIG welding equipment" },
  ];

  for (const cat of subCats) {
    await prisma.category.create({ data: { ...cat, isActive: true } });
  }

  // ═══════════════════════════════════════════════════════════════
  //  5. PRODUCT ATTRIBUTES & VALUES
  // ═══════════════════════════════════════════════════════════════
  console.log("🏷️  Creating Product Attributes...");

  const attrs = [
    { id: "attr_001", name: "Brand" },
    { id: "attr_002", name: "Color" },
    { id: "attr_003", name: "Size" },
    { id: "attr_004", name: "Condition" },
    { id: "attr_005", name: "Power" },
  ];

  for (const attr of attrs) {
    await prisma.productAttribute.create({ data: attr });
  }

  const attrValues = [
    // Brand
    { id: "av_001", attributeId: "attr_001", value: "CAT" },
    { id: "av_002", attributeId: "attr_001", value: "JCB" },
    { id: "av_003", attributeId: "attr_001", value: "Dell" },
    { id: "av_004", attributeId: "attr_001", value: "Canon" },
    { id: "av_005", attributeId: "attr_001", value: "Sony" },
    { id: "av_006", attributeId: "attr_001", value: "Bosch" },
    { id: "av_007", attributeId: "attr_001", value: "HP" },
    { id: "av_008", attributeId: "attr_001", value: "DJI" },
    // Color
    { id: "av_010", attributeId: "attr_002", value: "Yellow" },
    { id: "av_011", attributeId: "attr_002", value: "Black" },
    { id: "av_012", attributeId: "attr_002", value: "Silver" },
    { id: "av_013", attributeId: "attr_002", value: "White" },
    { id: "av_014", attributeId: "attr_002", value: "Blue" },
    // Size
    { id: "av_020", attributeId: "attr_003", value: "Small" },
    { id: "av_021", attributeId: "attr_003", value: "Medium" },
    { id: "av_022", attributeId: "attr_003", value: "Large" },
    { id: "av_023", attributeId: "attr_003", value: "Extra Large" },
    // Condition
    { id: "av_030", attributeId: "attr_004", value: "New" },
    { id: "av_031", attributeId: "attr_004", value: "Like New" },
    { id: "av_032", attributeId: "attr_004", value: "Good" },
    { id: "av_033", attributeId: "attr_004", value: "Fair" },
    // Power
    { id: "av_040", attributeId: "attr_005", value: "Electric" },
    { id: "av_041", attributeId: "attr_005", value: "Diesel" },
    { id: "av_042", attributeId: "attr_005", value: "Battery" },
    { id: "av_043", attributeId: "attr_005", value: "Manual" },
  ];

  for (const av of attrValues) {
    await prisma.productAttributeValue.create({ data: av });
  }

  // ═══════════════════════════════════════════════════════════════
  //  6. PRODUCTS (20 products across vendors & categories)
  // ═══════════════════════════════════════════════════════════════
  console.log("📦 Creating Products...");

  const products = [
    // Vendor 1 - Construction Equipment
    { id: "prod_001", vendorId: "vendor_001", categoryId: "cat_011", name: "CAT 320 Excavator", slug: "cat-320-excavator", description: "CAT 320 hydraulic excavator with 20-ton operating weight. Ideal for medium construction projects.", shortDescription: "20-ton hydraulic excavator", sku: "RE-EXC-001", costPrice: 5000, basePrice: 8500, securityDeposit: 25000, quantity: 5, minRentalPeriod: 1, maxRentalPeriod: 90, isPublished: true },
    { id: "prod_002", vendorId: "vendor_001", categoryId: "cat_011", name: "JCB 3CX Backhoe Loader", slug: "jcb-3cx-backhoe-loader", description: "JCB 3CX backhoe loader with 4WD. Versatile machine for digging, loading, and material handling.", shortDescription: "Versatile backhoe loader", sku: "RE-BCK-002", costPrice: 3500, basePrice: 6000, securityDeposit: 18000, quantity: 8, minRentalPeriod: 1, maxRentalPeriod: 60, isPublished: true },
    { id: "prod_003", vendorId: "vendor_001", categoryId: "cat_012", name: "Industrial Concrete Mixer 500L", slug: "industrial-concrete-mixer-500l", description: "Heavy-duty 500-liter concrete mixer with diesel engine. Perfect for large construction sites.", shortDescription: "500L diesel concrete mixer", sku: "RE-MIX-003", costPrice: 800, basePrice: 1500, securityDeposit: 5000, quantity: 12, minRentalPeriod: 1, maxRentalPeriod: 30, isPublished: true },
    { id: "prod_004", vendorId: "vendor_001", categoryId: "cat_013", name: "Steel Scaffolding Set (50m)", slug: "steel-scaffolding-set-50m", description: "Complete steel scaffolding system covering 50 meters. Includes frames, braces, and platforms.", shortDescription: "50m complete scaffolding system", sku: "RE-SCF-004", costPrice: 1200, basePrice: 2200, securityDeposit: 8000, quantity: 15, minRentalPeriod: 7, maxRentalPeriod: 180, isPublished: true },
    { id: "prod_005", vendorId: "vendor_001", categoryId: "cat_051", name: "Bosch GBH 8-45 Rotary Hammer", slug: "bosch-gbh-8-45-rotary-hammer", description: "Professional rotary hammer drill with SDS-max. 12.5J impact energy for heavy demolition work.", shortDescription: "Heavy-duty rotary hammer drill", sku: "RE-DRL-005", costPrice: 300, basePrice: 550, securityDeposit: 2000, quantity: 20, minRentalPeriod: 1, maxRentalPeriod: 14, isPublished: true },
    { id: "prod_006", vendorId: "vendor_001", categoryId: "cat_052", name: "Lincoln Electric MIG Welder", slug: "lincoln-electric-mig-welder", description: "Professional MIG welder with 250A output. Suitable for steel, stainless, and aluminum.", shortDescription: "250A professional MIG welder", sku: "RE-WLD-006", costPrice: 400, basePrice: 750, securityDeposit: 3000, quantity: 10, minRentalPeriod: 1, maxRentalPeriod: 30, isPublished: true },
    // Vendor 2 - IT & Electronics
    { id: "prod_007", vendorId: "vendor_002", categoryId: "cat_021", name: "Dell Latitude 5540 Laptop", slug: "dell-latitude-5540-laptop", description: "Dell Latitude 5540 with Intel i7, 16GB RAM, 512GB SSD. Business-grade laptop for corporate events.", shortDescription: "i7 business laptop with 16GB RAM", sku: "TR-LAP-007", costPrice: 600, basePrice: 1200, securityDeposit: 5000, quantity: 50, minRentalPeriod: 1, maxRentalPeriod: 90, isPublished: true },
    { id: "prod_008", vendorId: "vendor_002", categoryId: "cat_021", name: "HP ProBook 450 G10", slug: "hp-probook-450-g10", description: "HP ProBook 450 G10 with Intel i5, 8GB RAM, 256GB SSD. Affordable enterprise laptop.", shortDescription: "i5 enterprise laptop", sku: "TR-LAP-008", costPrice: 400, basePrice: 800, securityDeposit: 3500, quantity: 40, minRentalPeriod: 1, maxRentalPeriod: 60, isPublished: true },
    { id: "prod_009", vendorId: "vendor_002", categoryId: "cat_022", name: "Epson EB-2250U Projector", slug: "epson-eb-2250u-projector", description: "5000 lumens WUXGA projector with wireless connectivity. Ideal for large conference rooms.", shortDescription: "5000 lumens WUXGA projector", sku: "TR-PRJ-009", costPrice: 500, basePrice: 1000, securityDeposit: 4000, quantity: 15, minRentalPeriod: 1, maxRentalPeriod: 14, isPublished: true },
    { id: "prod_010", vendorId: "vendor_002", categoryId: "cat_022", name: "Sony VPL-FHZ131L Laser Projector", slug: "sony-fhz131l-laser-projector", description: "13000 lumens laser projector for large venues, auditoriums, and exhibitions.", shortDescription: "13000 lumens laser projector", sku: "TR-PRJ-010", costPrice: 2000, basePrice: 3500, securityDeposit: 15000, quantity: 5, minRentalPeriod: 1, maxRentalPeriod: 7, isPublished: true },
    { id: "prod_011", vendorId: "vendor_002", categoryId: "cat_023", name: "Dell PowerEdge R750 Server", slug: "dell-poweredge-r750-server", description: "Enterprise server with dual Xeon processors, 64GB RAM. For temporary data center setups.", shortDescription: "Dual Xeon enterprise server", sku: "TR-SRV-011", costPrice: 3000, basePrice: 5500, securityDeposit: 20000, quantity: 8, minRentalPeriod: 7, maxRentalPeriod: 180, isPublished: true },
    { id: "prod_012", vendorId: "vendor_002", categoryId: "cat_006", name: "HP LaserJet Enterprise M611", slug: "hp-laserjet-enterprise-m611", description: "High-volume monochrome laser printer. 65 pages per minute for heavy office use.", shortDescription: "65ppm enterprise laser printer", sku: "TR-PRT-012", costPrice: 250, basePrice: 500, securityDeposit: 2000, quantity: 25, minRentalPeriod: 7, maxRentalPeriod: 90, isPublished: true },
    // Vendor 3 - Events, Photography, Industrial
    { id: "prod_013", vendorId: "vendor_003", categoryId: "cat_031", name: "JBL VTX A12 Line Array System", slug: "jbl-vtx-a12-line-array", description: "Professional line array speaker system. 12-inch dual driver. Ideal for concert-grade events.", shortDescription: "Concert-grade line array speaker", sku: "HM-SND-013", costPrice: 1500, basePrice: 2800, securityDeposit: 10000, quantity: 10, minRentalPeriod: 1, maxRentalPeriod: 7, isPublished: true },
    { id: "prod_014", vendorId: "vendor_003", categoryId: "cat_031", name: "Yamaha TF5 Digital Mixer", slug: "yamaha-tf5-digital-mixer", description: "48-channel digital mixing console with TouchFlow operation. Studio quality for live events.", shortDescription: "48-channel digital mixer", sku: "HM-MIX-014", costPrice: 800, basePrice: 1500, securityDeposit: 6000, quantity: 6, minRentalPeriod: 1, maxRentalPeriod: 7, isPublished: true },
    { id: "prod_015", vendorId: "vendor_003", categoryId: "cat_032", name: "LED Stage Light Kit (8 Pack)", slug: "led-stage-light-kit-8pack", description: "8 LED par can lights with DMX controller. RGB color mixing for stage and event lighting.", shortDescription: "8-pack LED par lights with DMX", sku: "HM-LGT-015", costPrice: 300, basePrice: 600, securityDeposit: 2500, quantity: 20, minRentalPeriod: 1, maxRentalPeriod: 7, isPublished: true },
    { id: "prod_016", vendorId: "vendor_003", categoryId: "cat_041", name: "Canon EOS R5 Camera Kit", slug: "canon-eos-r5-camera-kit", description: "Canon EOS R5 mirrorless camera with 24-70mm f/2.8 lens. 45MP, 8K video capability.", shortDescription: "45MP mirrorless with 24-70mm lens", sku: "HM-CAM-016", costPrice: 1200, basePrice: 2200, securityDeposit: 8000, quantity: 8, minRentalPeriod: 1, maxRentalPeriod: 14, isPublished: true },
    { id: "prod_017", vendorId: "vendor_003", categoryId: "cat_041", name: "Sony A7 IV Camera Body", slug: "sony-a7-iv-camera-body", description: "Sony A7 IV full-frame mirrorless camera body. 33MP sensor with 4K 60fps video.", shortDescription: "33MP full-frame mirrorless camera", sku: "HM-CAM-017", costPrice: 900, basePrice: 1800, securityDeposit: 7000, quantity: 6, minRentalPeriod: 1, maxRentalPeriod: 14, isPublished: true },
    { id: "prod_018", vendorId: "vendor_003", categoryId: "cat_042", name: "DJI Mavic 3 Pro Drone", slug: "dji-mavic-3-pro-drone", description: "Triple-camera drone with Hasselblad main camera. 43-min flight time, 4/3 CMOS sensor.", shortDescription: "Triple-camera professional drone", sku: "HM-DRN-018", costPrice: 800, basePrice: 1500, securityDeposit: 6000, quantity: 5, minRentalPeriod: 1, maxRentalPeriod: 7, isPublished: true },
    { id: "prod_019", vendorId: "vendor_003", categoryId: "cat_001", name: "Portable Generator 10KVA", slug: "portable-generator-10kva", description: "10KVA diesel portable generator with auto-start. Ideal for outdoor events and construction sites.", shortDescription: "10KVA diesel portable generator", sku: "HM-GEN-019", costPrice: 500, basePrice: 950, securityDeposit: 4000, quantity: 15, minRentalPeriod: 1, maxRentalPeriod: 30, isPublished: true },
    { id: "prod_020", vendorId: "vendor_002", categoryId: "cat_006", name: "Ergonomic Office Chair Pack (10)", slug: "ergonomic-office-chair-pack-10", description: "Pack of 10 premium ergonomic office chairs with lumbar support. Ideal for temporary office setups.", shortDescription: "10 ergonomic chairs bundle", sku: "TR-CHR-020", costPrice: 200, basePrice: 400, securityDeposit: 1500, quantity: 30, minRentalPeriod: 7, maxRentalPeriod: 180, isPublished: true },
  ];

  for (const prod of products) {
    await prisma.product.create({
      data: {
        ...prod,
        costPrice: prod.costPrice,
        basePrice: prod.basePrice,
        securityDeposit: prod.securityDeposit,
        isRentable: true,
      },
    });
  }

  // ═══════════════════════════════════════════════════════════════
  //  7. PRODUCT IMAGES
  // ═══════════════════════════════════════════════════════════════
  console.log("🖼️  Creating Product Images...");

  const imageBase = "https://images.unsplash.com/photo";
  const productImages = [
    { id: "img_001", productId: "prod_001", url: `${imageBase}-1581092160607-ee67df30ae41?w=800`, alt: "CAT 320 Excavator", isPrimary: true, sortOrder: 0 },
    { id: "img_002", productId: "prod_001", url: `${imageBase}-1504307651254-35680f356dfd?w=800`, alt: "Excavator working", isPrimary: false, sortOrder: 1 },
    { id: "img_003", productId: "prod_002", url: `${imageBase}-1621922989543-1a5f5e25f9cd?w=800`, alt: "JCB Backhoe Loader", isPrimary: true, sortOrder: 0 },
    { id: "img_004", productId: "prod_003", url: `${imageBase}-1590496794008-383c8070b257?w=800`, alt: "Concrete Mixer", isPrimary: true, sortOrder: 0 },
    { id: "img_005", productId: "prod_004", url: `${imageBase}-1504307651254-35680f356dfd?w=800`, alt: "Steel Scaffolding", isPrimary: true, sortOrder: 0 },
    { id: "img_006", productId: "prod_005", url: `${imageBase}-1572981779307-38b8cabb2407?w=800`, alt: "Bosch Rotary Hammer", isPrimary: true, sortOrder: 0 },
    { id: "img_007", productId: "prod_006", url: `${imageBase}-1504328345606-18bbc8c9d7d1?w=800`, alt: "MIG Welder", isPrimary: true, sortOrder: 0 },
    { id: "img_008", productId: "prod_007", url: `${imageBase}-1496181133206-80ce9b88a853?w=800`, alt: "Dell Laptop", isPrimary: true, sortOrder: 0 },
    { id: "img_009", productId: "prod_007", url: `${imageBase}-1517336714731-489689fd1ca8?w=800`, alt: "Dell Laptop side view", isPrimary: false, sortOrder: 1 },
    { id: "img_010", productId: "prod_008", url: `${imageBase}-1525547719851-1f65e20c5f14?w=800`, alt: "HP ProBook", isPrimary: true, sortOrder: 0 },
    { id: "img_011", productId: "prod_009", url: `${imageBase}-1478737270264-f84ec407f3ac?w=800`, alt: "Epson Projector", isPrimary: true, sortOrder: 0 },
    { id: "img_012", productId: "prod_010", url: `${imageBase}-1517604931442-7e0c8ed2963c?w=800`, alt: "Sony Laser Projector", isPrimary: true, sortOrder: 0 },
    { id: "img_013", productId: "prod_011", url: `${imageBase}-1558494949-ef010cbdcc31?w=800`, alt: "Dell Server", isPrimary: true, sortOrder: 0 },
    { id: "img_014", productId: "prod_012", url: `${imageBase}-1612815154858-60aa4c59eaa6?w=800`, alt: "HP Printer", isPrimary: true, sortOrder: 0 },
    { id: "img_015", productId: "prod_013", url: `${imageBase}-1493676304819-0d7a8d026dcf?w=800`, alt: "JBL Line Array", isPrimary: true, sortOrder: 0 },
    { id: "img_016", productId: "prod_014", url: `${imageBase}-1598488035139-bdbb2231ce04?w=800`, alt: "Yamaha Mixer", isPrimary: true, sortOrder: 0 },
    { id: "img_017", productId: "prod_015", url: `${imageBase}-1504509546545-e000b4a62425?w=800`, alt: "LED Stage Lights", isPrimary: true, sortOrder: 0 },
    { id: "img_018", productId: "prod_016", url: `${imageBase}-1516035069371-29a1b244cc32?w=800`, alt: "Canon EOS R5", isPrimary: true, sortOrder: 0 },
    { id: "img_019", productId: "prod_017", url: `${imageBase}-1510127034890-ba27508e9f1c?w=800`, alt: "Sony A7 IV", isPrimary: true, sortOrder: 0 },
    { id: "img_020", productId: "prod_018", url: `${imageBase}-1473968512647-3e447244af8f?w=800`, alt: "DJI Mavic 3 Pro", isPrimary: true, sortOrder: 0 },
    { id: "img_021", productId: "prod_019", url: `${imageBase}-1530587191325-3db32d826c18?w=800`, alt: "Portable Generator", isPrimary: true, sortOrder: 0 },
    { id: "img_022", productId: "prod_020", url: `${imageBase}-1524758631624-e2822e304c36?w=800`, alt: "Office Chairs", isPrimary: true, sortOrder: 0 },
  ];

  for (const img of productImages) {
    await prisma.productImage.create({ data: img });
  }

  // ═══════════════════════════════════════════════════════════════
  //  8. PRODUCT VARIANTS
  // ═══════════════════════════════════════════════════════════════
  console.log("🔀 Creating Product Variants...");

  const variants = [
    { id: "var_001", productId: "prod_001", sku: "RE-EXC-001-STD", name: "Standard Bucket", priceModifier: 0, quantity: 3 },
    { id: "var_002", productId: "prod_001", sku: "RE-EXC-001-WDE", name: "Wide Bucket", priceModifier: 1500, quantity: 2 },
    { id: "var_003", productId: "prod_007", sku: "TR-LAP-007-8GB", name: "8GB RAM", priceModifier: -200, quantity: 20 },
    { id: "var_004", productId: "prod_007", sku: "TR-LAP-007-16GB", name: "16GB RAM", priceModifier: 0, quantity: 20 },
    { id: "var_005", productId: "prod_007", sku: "TR-LAP-007-32GB", name: "32GB RAM", priceModifier: 400, quantity: 10 },
    { id: "var_006", productId: "prod_016", sku: "HM-CAM-016-BODY", name: "Body Only", priceModifier: -800, quantity: 3 },
    { id: "var_007", productId: "prod_016", sku: "HM-CAM-016-KIT", name: "Full Kit with 24-70mm", priceModifier: 0, quantity: 5 },
    { id: "var_008", productId: "prod_015", sku: "HM-LGT-015-4PK", name: "4-Pack", priceModifier: -300, quantity: 10 },
    { id: "var_009", productId: "prod_015", sku: "HM-LGT-015-8PK", name: "8-Pack", priceModifier: 0, quantity: 10 },
    { id: "var_010", productId: "prod_018", sku: "HM-DRN-018-STD", name: "Standard Package", priceModifier: 0, quantity: 3 },
    { id: "var_011", productId: "prod_018", sku: "HM-DRN-018-FLY", name: "Fly More Combo", priceModifier: 500, quantity: 2 },
  ];

  for (const v of variants) {
    await prisma.productVariant.create({ data: { ...v, isActive: true } });
  }

  // ═══════════════════════════════════════════════════════════════
  //  9. PRODUCT VARIANT ATTRIBUTES
  // ═══════════════════════════════════════════════════════════════
  console.log("🔗 Creating Variant Attributes...");

  const variantAttrs = [
    { id: "pva_001", variantId: "var_001", attributeValueId: "av_001" }, // CAT brand
    { id: "pva_002", variantId: "var_001", attributeValueId: "av_010" }, // Yellow
    { id: "pva_003", variantId: "var_002", attributeValueId: "av_001" }, // CAT brand
    { id: "pva_004", variantId: "var_002", attributeValueId: "av_010" }, // Yellow
    { id: "pva_005", variantId: "var_003", attributeValueId: "av_003" }, // Dell brand
    { id: "pva_006", variantId: "var_003", attributeValueId: "av_011" }, // Black
    { id: "pva_007", variantId: "var_004", attributeValueId: "av_003" }, // Dell brand
    { id: "pva_008", variantId: "var_004", attributeValueId: "av_012" }, // Silver
    { id: "pva_009", variantId: "var_005", attributeValueId: "av_003" }, // Dell brand
    { id: "pva_010", variantId: "var_005", attributeValueId: "av_011" }, // Black
    { id: "pva_011", variantId: "var_006", attributeValueId: "av_004" }, // Canon brand
    { id: "pva_012", variantId: "var_007", attributeValueId: "av_004" }, // Canon brand
    { id: "pva_013", variantId: "var_010", attributeValueId: "av_008" }, // DJI brand
    { id: "pva_014", variantId: "var_011", attributeValueId: "av_008" }, // DJI brand
  ];

  for (const pva of variantAttrs) {
    await prisma.productVariantAttribute.create({ data: pva });
  }

  // ═══════════════════════════════════════════════════════════════
  //  10. RENTAL PRICING (multiple period types per product)
  // ═══════════════════════════════════════════════════════════════
  console.log("💰 Creating Rental Pricing...");

  const pricingData = [
    // Excavator
    { id: "rp_001", productId: "prod_001", periodType: "DAILY" as const, duration: 1, price: 8500 },
    { id: "rp_002", productId: "prod_001", periodType: "WEEKLY" as const, duration: 1, price: 50000 },
    // Backhoe
    { id: "rp_003", productId: "prod_002", periodType: "DAILY" as const, duration: 1, price: 6000 },
    { id: "rp_004", productId: "prod_002", periodType: "WEEKLY" as const, duration: 1, price: 35000 },
    // Concrete Mixer
    { id: "rp_005", productId: "prod_003", periodType: "DAILY" as const, duration: 1, price: 1500 },
    { id: "rp_006", productId: "prod_003", periodType: "WEEKLY" as const, duration: 1, price: 8500 },
    // Scaffolding
    { id: "rp_007", productId: "prod_004", periodType: "WEEKLY" as const, duration: 1, price: 2200 },
    { id: "rp_008", productId: "prod_004", periodType: "WEEKLY" as const, duration: 4, price: 7500 },
    // Rotary Hammer
    { id: "rp_009", productId: "prod_005", periodType: "DAILY" as const, duration: 1, price: 550 },
    { id: "rp_010", productId: "prod_005", periodType: "HOURLY" as const, duration: 1, price: 100 },
    // MIG Welder
    { id: "rp_011", productId: "prod_006", periodType: "DAILY" as const, duration: 1, price: 750 },
    { id: "rp_012", productId: "prod_006", periodType: "WEEKLY" as const, duration: 1, price: 4200 },
    // Dell Laptop
    { id: "rp_013", productId: "prod_007", periodType: "DAILY" as const, duration: 1, price: 1200 },
    { id: "rp_014", productId: "prod_007", periodType: "WEEKLY" as const, duration: 1, price: 7000 },
    // HP Laptop
    { id: "rp_015", productId: "prod_008", periodType: "DAILY" as const, duration: 1, price: 800 },
    { id: "rp_016", productId: "prod_008", periodType: "WEEKLY" as const, duration: 1, price: 4500 },
    // Epson Projector
    { id: "rp_017", productId: "prod_009", periodType: "DAILY" as const, duration: 1, price: 1000 },
    { id: "rp_018", productId: "prod_009", periodType: "HOURLY" as const, duration: 1, price: 200 },
    // Sony Projector
    { id: "rp_019", productId: "prod_010", periodType: "DAILY" as const, duration: 1, price: 3500 },
    // Server
    { id: "rp_020", productId: "prod_011", periodType: "WEEKLY" as const, duration: 1, price: 5500 },
    { id: "rp_021", productId: "prod_011", periodType: "WEEKLY" as const, duration: 4, price: 18000 },
    // Printer
    { id: "rp_022", productId: "prod_012", periodType: "WEEKLY" as const, duration: 1, price: 500 },
    // JBL Line Array
    { id: "rp_023", productId: "prod_013", periodType: "DAILY" as const, duration: 1, price: 2800 },
    // Yamaha Mixer
    { id: "rp_024", productId: "prod_014", periodType: "DAILY" as const, duration: 1, price: 1500 },
    // LED Lights
    { id: "rp_025", productId: "prod_015", periodType: "DAILY" as const, duration: 1, price: 600 },
    // Canon Camera
    { id: "rp_026", productId: "prod_016", periodType: "DAILY" as const, duration: 1, price: 2200 },
    { id: "rp_027", productId: "prod_016", periodType: "WEEKLY" as const, duration: 1, price: 12000 },
    // Sony Camera
    { id: "rp_028", productId: "prod_017", periodType: "DAILY" as const, duration: 1, price: 1800 },
    // Drone
    { id: "rp_029", productId: "prod_018", periodType: "DAILY" as const, duration: 1, price: 1500 },
    { id: "rp_030", productId: "prod_018", periodType: "HOURLY" as const, duration: 1, price: 300 },
    // Generator
    { id: "rp_031", productId: "prod_019", periodType: "DAILY" as const, duration: 1, price: 950 },
    { id: "rp_032", productId: "prod_019", periodType: "WEEKLY" as const, duration: 1, price: 5500 },
    // Office Chairs
    { id: "rp_033", productId: "prod_020", periodType: "WEEKLY" as const, duration: 1, price: 400 },
    { id: "rp_034", productId: "prod_020", periodType: "WEEKLY" as const, duration: 4, price: 1300 },
  ];

  for (const rp of pricingData) {
    await prisma.rentalPricing.create({ data: { ...rp, isActive: true } });
  }

  // ═══════════════════════════════════════════════════════════════
  //  11. INVENTORY
  // ═══════════════════════════════════════════════════════════════
  console.log("📊 Creating Inventory...");

  const inventoryData = [
    { id: "inv_001", productId: "prod_001", quantity: 3, location: "IN_WAREHOUSE" as const },
    { id: "inv_002", productId: "prod_001", quantity: 2, location: "WITH_CUSTOMER" as const },
    { id: "inv_003", productId: "prod_002", quantity: 6, location: "IN_WAREHOUSE" as const },
    { id: "inv_004", productId: "prod_002", quantity: 2, location: "WITH_CUSTOMER" as const },
    { id: "inv_005", productId: "prod_003", quantity: 10, location: "IN_WAREHOUSE" as const },
    { id: "inv_006", productId: "prod_003", quantity: 2, location: "WITH_CUSTOMER" as const },
    { id: "inv_007", productId: "prod_004", quantity: 12, location: "IN_WAREHOUSE" as const },
    { id: "inv_008", productId: "prod_004", quantity: 3, location: "WITH_CUSTOMER" as const },
    { id: "inv_009", productId: "prod_005", quantity: 18, location: "IN_WAREHOUSE" as const },
    { id: "inv_010", productId: "prod_005", quantity: 1, location: "MAINTENANCE" as const },
    { id: "inv_011", productId: "prod_006", quantity: 8, location: "IN_WAREHOUSE" as const },
    { id: "inv_012", productId: "prod_007", quantity: 40, location: "IN_WAREHOUSE" as const },
    { id: "inv_013", productId: "prod_007", quantity: 10, location: "WITH_CUSTOMER" as const },
    { id: "inv_014", productId: "prod_008", quantity: 35, location: "IN_WAREHOUSE" as const },
    { id: "inv_015", productId: "prod_009", quantity: 12, location: "IN_WAREHOUSE" as const },
    { id: "inv_016", productId: "prod_010", quantity: 4, location: "IN_WAREHOUSE" as const },
    { id: "inv_017", productId: "prod_010", quantity: 1, location: "WITH_CUSTOMER" as const },
    { id: "inv_018", productId: "prod_011", quantity: 6, location: "IN_WAREHOUSE" as const },
    { id: "inv_019", productId: "prod_012", quantity: 22, location: "IN_WAREHOUSE" as const },
    { id: "inv_020", productId: "prod_013", quantity: 8, location: "IN_WAREHOUSE" as const },
    { id: "inv_021", productId: "prod_013", quantity: 2, location: "IN_TRANSIT" as const },
    { id: "inv_022", productId: "prod_014", quantity: 5, location: "IN_WAREHOUSE" as const },
    { id: "inv_023", productId: "prod_015", quantity: 16, location: "IN_WAREHOUSE" as const },
    { id: "inv_024", productId: "prod_016", quantity: 6, location: "IN_WAREHOUSE" as const },
    { id: "inv_025", productId: "prod_017", quantity: 5, location: "IN_WAREHOUSE" as const },
    { id: "inv_026", productId: "prod_018", quantity: 4, location: "IN_WAREHOUSE" as const },
    { id: "inv_027", productId: "prod_019", quantity: 12, location: "IN_WAREHOUSE" as const },
    { id: "inv_028", productId: "prod_019", quantity: 3, location: "WITH_CUSTOMER" as const },
    { id: "inv_029", productId: "prod_020", quantity: 25, location: "IN_WAREHOUSE" as const },
    { id: "inv_030", productId: "prod_020", quantity: 5, location: "WITH_CUSTOMER" as const },
  ];

  for (const inv of inventoryData) {
    await prisma.inventory.create({ data: inv });
  }

  // ═══════════════════════════════════════════════════════════════
  //  12. CARTS & CART ITEMS
  // ═══════════════════════════════════════════════════════════════
  console.log("🛒 Creating Carts...");

  const now = new Date();
  const inFuture = (days: number) => new Date(now.getTime() + days * 86400000);

  // Customer 1 Cart
  await prisma.cart.create({
    data: {
      id: "cart_001",
      userId: "cust_001",
      items: {
        create: [
          { id: "ci_001", productId: "prod_003", quantity: 2, rentalStartDate: inFuture(5), rentalEndDate: inFuture(12), periodType: "WEEKLY" },
          { id: "ci_002", productId: "prod_005", quantity: 1, rentalStartDate: inFuture(5), rentalEndDate: inFuture(8), periodType: "DAILY" },
        ],
      },
    },
  });

  // Customer 4 Cart
  await prisma.cart.create({
    data: {
      id: "cart_002",
      userId: "cust_004",
      items: {
        create: [
          { id: "ci_003", productId: "prod_016", quantity: 1, rentalStartDate: inFuture(3), rentalEndDate: inFuture(5), periodType: "DAILY" },
          { id: "ci_004", productId: "prod_018", quantity: 1, rentalStartDate: inFuture(3), rentalEndDate: inFuture(4), periodType: "DAILY" },
          { id: "ci_005", productId: "prod_015", quantity: 1, rentalStartDate: inFuture(3), rentalEndDate: inFuture(5), periodType: "DAILY" },
        ],
      },
    },
  });

  // Customer 6 Cart
  await prisma.cart.create({
    data: {
      id: "cart_003",
      userId: "cust_006",
      items: {
        create: [
          { id: "ci_006", productId: "prod_020", quantity: 3, rentalStartDate: inFuture(10), rentalEndDate: inFuture(38), periodType: "WEEKLY" },
        ],
      },
    },
  });

  // ═══════════════════════════════════════════════════════════════
  //  13. WISHLISTS
  // ═══════════════════════════════════════════════════════════════
  console.log("❤️  Creating Wishlists...");

  const wishlists = [
    { id: "wl_001", userId: "cust_001", productId: "prod_001" },
    { id: "wl_002", userId: "cust_001", productId: "prod_019" },
    { id: "wl_003", userId: "cust_002", productId: "prod_013" },
    { id: "wl_004", userId: "cust_002", productId: "prod_014" },
    { id: "wl_005", userId: "cust_002", productId: "prod_015" },
    { id: "wl_006", userId: "cust_003", productId: "prod_007" },
    { id: "wl_007", userId: "cust_003", productId: "prod_011" },
    { id: "wl_008", userId: "cust_004", productId: "prod_016" },
    { id: "wl_009", userId: "cust_004", productId: "prod_017" },
    { id: "wl_010", userId: "cust_005", productId: "prod_002" },
    { id: "wl_011", userId: "cust_006", productId: "prod_009" },
    { id: "wl_012", userId: "cust_007", productId: "prod_001" },
    { id: "wl_013", userId: "cust_007", productId: "prod_003" },
    { id: "wl_014", userId: "cust_008", productId: "prod_018" },
    { id: "wl_015", userId: "cust_008", productId: "prod_016" },
  ];

  for (const wl of wishlists) {
    await prisma.wishlist.create({ data: wl });
  }

  // ═══════════════════════════════════════════════════════════════
  //  14. QUOTATIONS & QUOTATION ITEMS
  // ═══════════════════════════════════════════════════════════════
  console.log("📋 Creating Quotations...");

  const past = (days: number) => new Date(now.getTime() - days * 86400000);

  const quotations = [
    // CONFIRMED quotations (will become orders)
    {
      id: "quot_001", quotationNumber: "QT-2026-0001", customerId: "cust_001", addressId: "addr_001",
      status: "CONFIRMED" as const, subtotal: 51000, taxAmount: 9180, discountAmount: 0, totalAmount: 60180, securityDeposit: 25000,
      notes: "Need excavator for 1 week at construction site", validUntil: inFuture(30), createdAt: past(20),
    },
    {
      id: "quot_002", quotationNumber: "QT-2026-0002", customerId: "cust_002", addressId: "addr_003",
      status: "CONFIRMED" as const, subtotal: 14800, taxAmount: 2664, discountAmount: 500, totalAmount: 16964, securityDeposit: 10000,
      notes: "Corporate event audio/visual setup", validUntil: inFuture(15), createdAt: past(15),
    },
    {
      id: "quot_003", quotationNumber: "QT-2026-0003", customerId: "cust_003", addressId: "addr_005",
      status: "CONFIRMED" as const, subtotal: 84000, taxAmount: 15120, discountAmount: 2000, totalAmount: 97120, securityDeposit: 50000,
      notes: "Laptop fleet for 3-month project", validUntil: inFuture(20), createdAt: past(25),
    },
    {
      id: "quot_004", quotationNumber: "QT-2026-0004", customerId: "cust_005", addressId: "addr_007",
      status: "CONFIRMED" as const, subtotal: 42000, taxAmount: 7560, discountAmount: 0, totalAmount: 49560, securityDeposit: 18000,
      notes: "Backhoe loader for road construction", validUntil: inFuture(30), createdAt: past(18),
    },
    {
      id: "quot_005", quotationNumber: "QT-2026-0005", customerId: "cust_007", addressId: "addr_009",
      status: "CONFIRMED" as const, subtotal: 19000, taxAmount: 3420, discountAmount: 1000, totalAmount: 21420, securityDeposit: 9000,
      notes: "Generator and scaffolding for building project", validUntil: inFuture(25), createdAt: past(12),
    },
    // DRAFT quotations
    {
      id: "quot_006", quotationNumber: "QT-2026-0006", customerId: "cust_004", addressId: "addr_006",
      status: "DRAFT" as const, subtotal: 6600, taxAmount: 1188, discountAmount: 0, totalAmount: 7788, securityDeposit: 8000,
      notes: "Camera gear for wedding shoot", validUntil: inFuture(10), createdAt: past(3),
    },
    {
      id: "quot_007", quotationNumber: "QT-2026-0007", customerId: "cust_006", addressId: "addr_008",
      status: "DRAFT" as const, subtotal: 2000, taxAmount: 360, discountAmount: 0, totalAmount: 2360, securityDeposit: 4000,
      notes: "Projector for office presentation", validUntil: inFuture(7), createdAt: past(1),
    },
    // SENT quotation
    {
      id: "quot_008", quotationNumber: "QT-2026-0008", customerId: "cust_008", addressId: "addr_010",
      status: "SENT" as const, subtotal: 3000, taxAmount: 540, discountAmount: 0, totalAmount: 3540, securityDeposit: 6000,
      notes: "Drone rental for aerial video", validUntil: inFuture(14), createdAt: past(2),
    },
    // EXPIRED
    {
      id: "quot_009", quotationNumber: "QT-2026-0009", customerId: "cust_001", addressId: "addr_001",
      status: "EXPIRED" as const, subtotal: 12000, taxAmount: 2160, discountAmount: 0, totalAmount: 14160, securityDeposit: 6000,
      notes: "Welder equipment for factory repairs", validUntil: past(5), createdAt: past(40),
    },
    // CANCELLED
    {
      id: "quot_010", quotationNumber: "QT-2026-0010", customerId: "cust_003", addressId: "addr_005",
      status: "CANCELLED" as const, subtotal: 7000, taxAmount: 1260, discountAmount: 0, totalAmount: 8260, securityDeposit: 4000,
      notes: "Projector for conference - cancelled", validUntil: past(2), createdAt: past(30),
    },
  ];

  for (const q of quotations) {
    await prisma.quotation.create({ data: q });
  }

  // Quotation Items
  const quotationItems = [
    // QT-0001: Excavator 1 week
    { id: "qi_001", quotationId: "quot_001", productId: "prod_001", quantity: 1, unitPrice: 8500, totalPrice: 51000, rentalStartDate: past(18), rentalEndDate: past(11), periodType: "DAILY" as const, periodDuration: 6 },
    // QT-0002: Sound + Lights for event
    { id: "qi_002", quotationId: "quot_002", productId: "prod_013", quantity: 1, unitPrice: 2800, totalPrice: 8400, rentalStartDate: past(10), rentalEndDate: past(7), periodType: "DAILY" as const, periodDuration: 3 },
    { id: "qi_003", quotationId: "quot_002", productId: "prod_015", quantity: 2, unitPrice: 600, totalPrice: 3600, rentalStartDate: past(10), rentalEndDate: past(7), periodType: "DAILY" as const, periodDuration: 3 },
    { id: "qi_004", quotationId: "quot_002", productId: "prod_014", quantity: 1, unitPrice: 1500, totalPrice: 2800, rentalStartDate: past(10), rentalEndDate: past(7), periodType: "DAILY" as const, periodDuration: 2 },
    // QT-0003: 20 Dell Laptops 12 weeks
    { id: "qi_005", quotationId: "quot_003", productId: "prod_007", quantity: 20, unitPrice: 7000, totalPrice: 84000, rentalStartDate: past(22), rentalEndDate: inFuture(62), periodType: "WEEKLY" as const, periodDuration: 12 },
    // QT-0004: 1 Backhoe 1 week
    { id: "qi_006", quotationId: "quot_004", productId: "prod_002", quantity: 1, unitPrice: 6000, totalPrice: 42000, rentalStartDate: past(15), rentalEndDate: past(8), periodType: "DAILY" as const, periodDuration: 7 },
    // QT-0005: Generator + Scaffolding
    { id: "qi_007", quotationId: "quot_005", productId: "prod_019", quantity: 2, unitPrice: 950, totalPrice: 13300, rentalStartDate: past(10), rentalEndDate: past(3), periodType: "DAILY" as const, periodDuration: 7 },
    { id: "qi_008", quotationId: "quot_005", productId: "prod_004", quantity: 1, unitPrice: 2200, totalPrice: 5700, rentalStartDate: past(10), rentalEndDate: inFuture(18), periodType: "WEEKLY" as const, periodDuration: 4 },
    // QT-0006: Canon Camera
    { id: "qi_009", quotationId: "quot_006", productId: "prod_016", quantity: 1, unitPrice: 2200, totalPrice: 6600, rentalStartDate: inFuture(7), rentalEndDate: inFuture(10), periodType: "DAILY" as const, periodDuration: 3 },
    // QT-0007: Projector
    { id: "qi_010", quotationId: "quot_007", productId: "prod_009", quantity: 1, unitPrice: 1000, totalPrice: 2000, rentalStartDate: inFuture(5), rentalEndDate: inFuture(7), periodType: "DAILY" as const, periodDuration: 2 },
    // QT-0008: Drone
    { id: "qi_011", quotationId: "quot_008", productId: "prod_018", quantity: 1, unitPrice: 1500, totalPrice: 3000, rentalStartDate: inFuture(5), rentalEndDate: inFuture(7), periodType: "DAILY" as const, periodDuration: 2 },
    // QT-0009: Welder
    { id: "qi_012", quotationId: "quot_009", productId: "prod_006", quantity: 2, unitPrice: 750, totalPrice: 12000, rentalStartDate: past(35), rentalEndDate: past(27), periodType: "DAILY" as const, periodDuration: 8 },
    // QT-0010: Projector (cancelled)
    { id: "qi_013", quotationId: "quot_010", productId: "prod_010", quantity: 1, unitPrice: 3500, totalPrice: 7000, rentalStartDate: past(25), rentalEndDate: past(23), periodType: "DAILY" as const, periodDuration: 2 },
  ];

  for (const qi of quotationItems) {
    await prisma.quotationItem.create({ data: qi });
  }

  // ═══════════════════════════════════════════════════════════════
  //  15. RENTAL ORDERS & ORDER ITEMS
  // ═══════════════════════════════════════════════════════════════
  console.log("📦 Creating Rental Orders...");

  const orders = [
    // COMPLETED orders
    {
      id: "ord_001", orderNumber: "RO-2026-0001", quotationId: "quot_001", customerId: "cust_001", addressId: "addr_001",
      status: "COMPLETED" as const, subtotal: 51000, taxAmount: 9180, totalAmount: 60180, securityDeposit: 25000, paidAmount: 60180,
      deliveryMethod: "pickup", confirmedAt: past(18), completedAt: past(10), createdAt: past(20),
    },
    {
      id: "ord_002", orderNumber: "RO-2026-0002", quotationId: "quot_002", customerId: "cust_002", addressId: "addr_003",
      status: "COMPLETED" as const, subtotal: 14800, taxAmount: 2664, discountAmount: 500, totalAmount: 16964, securityDeposit: 10000, paidAmount: 16964,
      deliveryMethod: "delivery", confirmedAt: past(12), completedAt: past(6), createdAt: past(15),
    },
    // IN_PROGRESS orders
    {
      id: "ord_003", orderNumber: "RO-2026-0003", quotationId: "quot_003", customerId: "cust_003", addressId: "addr_005",
      status: "IN_PROGRESS" as const, subtotal: 84000, taxAmount: 15120, discountAmount: 2000, totalAmount: 97120, securityDeposit: 50000, paidAmount: 97120,
      deliveryMethod: "delivery", confirmedAt: past(22), createdAt: past(25),
    },
    {
      id: "ord_004", orderNumber: "RO-2026-0004", quotationId: "quot_004", customerId: "cust_005", addressId: "addr_007",
      status: "IN_PROGRESS" as const, subtotal: 42000, taxAmount: 7560, totalAmount: 49560, securityDeposit: 18000, paidAmount: 49560,
      deliveryMethod: "pickup", confirmedAt: past(14), createdAt: past(18),
    },
    // CONFIRMED order
    {
      id: "ord_005", orderNumber: "RO-2026-0005", quotationId: "quot_005", customerId: "cust_007", addressId: "addr_009",
      status: "CONFIRMED" as const, subtotal: 19000, taxAmount: 3420, discountAmount: 1000, totalAmount: 21420, securityDeposit: 9000, paidAmount: 21420,
      deliveryMethod: "pickup", confirmedAt: past(10), createdAt: past(12),
    },
    // Additional orders without quotations
    {
      id: "ord_006", orderNumber: "RO-2026-0006", customerId: "cust_008", addressId: "addr_010",
      status: "COMPLETED" as const, subtotal: 4400, taxAmount: 792, totalAmount: 5192, securityDeposit: 8000, paidAmount: 5192,
      deliveryMethod: "pickup", confirmedAt: past(30), completedAt: past(25), createdAt: past(32),
    },
    {
      id: "ord_007", orderNumber: "RO-2026-0007", customerId: "cust_002", addressId: "addr_003",
      status: "IN_PROGRESS" as const, subtotal: 6000, taxAmount: 1080, totalAmount: 7080, securityDeposit: 3500, paidAmount: 7080,
      deliveryMethod: "delivery", confirmedAt: past(5), createdAt: past(7),
    },
    {
      id: "ord_008", orderNumber: "RO-2026-0008", customerId: "cust_004", addressId: "addr_006",
      status: "CONFIRMED" as const, subtotal: 5400, taxAmount: 972, totalAmount: 6372, securityDeposit: 7000, paidAmount: 6372,
      deliveryMethod: "pickup", confirmedAt: past(2), createdAt: past(4),
    },
    // CANCELLED order
    {
      id: "ord_009", orderNumber: "RO-2026-0009", customerId: "cust_006", addressId: "addr_008",
      status: "CANCELLED" as const, subtotal: 9500, taxAmount: 1710, totalAmount: 11210, securityDeposit: 4000, paidAmount: 0,
      deliveryMethod: "pickup", cancelledAt: past(8), createdAt: past(14),
    },
    // DRAFT order
    {
      id: "ord_010", orderNumber: "RO-2026-0010", customerId: "cust_001", addressId: "addr_002",
      status: "DRAFT" as const, subtotal: 3000, taxAmount: 540, totalAmount: 3540, securityDeposit: 5000, paidAmount: 0,
      deliveryMethod: "pickup", createdAt: past(1),
    },
  ];

  for (const o of orders) {
    await prisma.rentalOrder.create({ data: o });
  }

  // Order Items
  const orderItems = [
    // RO-0001: Excavator
    { id: "oi_001", orderId: "ord_001", productId: "prod_001", quantity: 1, unitPrice: 8500, totalPrice: 51000, rentalStartDate: past(18), rentalEndDate: past(12), periodType: "DAILY" as const, periodDuration: 6, actualReturnDate: past(11) },
    // RO-0002: Event equipment
    { id: "oi_002", orderId: "ord_002", productId: "prod_013", quantity: 1, unitPrice: 2800, totalPrice: 8400, rentalStartDate: past(10), rentalEndDate: past(7), periodType: "DAILY" as const, periodDuration: 3, actualReturnDate: past(7) },
    { id: "oi_003", orderId: "ord_002", productId: "prod_015", quantity: 2, unitPrice: 600, totalPrice: 3600, rentalStartDate: past(10), rentalEndDate: past(7), periodType: "DAILY" as const, periodDuration: 3, actualReturnDate: past(7) },
    { id: "oi_004", orderId: "ord_002", productId: "prod_014", quantity: 1, unitPrice: 1500, totalPrice: 2800, rentalStartDate: past(10), rentalEndDate: past(7), periodType: "DAILY" as const, periodDuration: 2, actualReturnDate: past(6) },
    // RO-0003: 20 Laptops
    { id: "oi_005", orderId: "ord_003", productId: "prod_007", quantity: 20, unitPrice: 7000, totalPrice: 84000, rentalStartDate: past(22), rentalEndDate: inFuture(62), periodType: "WEEKLY" as const, periodDuration: 12 },
    // RO-0004: Backhoe loader
    { id: "oi_006", orderId: "ord_004", productId: "prod_002", quantity: 1, unitPrice: 6000, totalPrice: 42000, rentalStartDate: past(15), rentalEndDate: past(8), periodType: "DAILY" as const, periodDuration: 7 },
    // RO-0005: Generator + Scaffolding
    { id: "oi_007", orderId: "ord_005", productId: "prod_019", quantity: 2, unitPrice: 950, totalPrice: 13300, rentalStartDate: past(10), rentalEndDate: past(3), periodType: "DAILY" as const, periodDuration: 7 },
    { id: "oi_008", orderId: "ord_005", productId: "prod_004", quantity: 1, unitPrice: 2200, totalPrice: 5700, rentalStartDate: past(10), rentalEndDate: inFuture(18), periodType: "WEEKLY" as const, periodDuration: 4 },
    // RO-0006: Canon Camera
    { id: "oi_009", orderId: "ord_006", productId: "prod_016", quantity: 1, unitPrice: 2200, totalPrice: 4400, rentalStartDate: past(30), rentalEndDate: past(28), periodType: "DAILY" as const, periodDuration: 2, actualReturnDate: past(27) },
    // RO-0007: HP Laptop
    { id: "oi_010", orderId: "ord_007", productId: "prod_008", quantity: 5, unitPrice: 800, totalPrice: 6000, rentalStartDate: past(5), rentalEndDate: inFuture(9), periodType: "WEEKLY" as const, periodDuration: 2 },
    // RO-0008: Sony Camera
    { id: "oi_011", orderId: "ord_008", productId: "prod_017", quantity: 1, unitPrice: 1800, totalPrice: 5400, rentalStartDate: inFuture(2), rentalEndDate: inFuture(5), periodType: "DAILY" as const, periodDuration: 3 },
    // RO-0009: Generator (cancelled)
    { id: "oi_012", orderId: "ord_009", productId: "prod_019", quantity: 1, unitPrice: 950, totalPrice: 9500, rentalStartDate: past(10), rentalEndDate: past(0), periodType: "DAILY" as const, periodDuration: 10 },
    // RO-0010: Concrete Mixer (draft)
    { id: "oi_013", orderId: "ord_010", productId: "prod_003", quantity: 1, unitPrice: 1500, totalPrice: 3000, rentalStartDate: inFuture(5), rentalEndDate: inFuture(7), periodType: "DAILY" as const, periodDuration: 2 },
  ];

  for (const oi of orderItems) {
    await prisma.rentalOrderItem.create({ data: oi });
  }

  // ═══════════════════════════════════════════════════════════════
  //  16. RESERVATIONS
  // ═══════════════════════════════════════════════════════════════
  console.log("🔒 Creating Reservations...");

  const reservations = [
    { id: "res_001", productId: "prod_001", orderId: "ord_001", quantity: 1, startDate: past(18), endDate: past(12), isActive: false },
    { id: "res_002", productId: "prod_013", orderId: "ord_002", quantity: 1, startDate: past(10), endDate: past(7), isActive: false },
    { id: "res_003", productId: "prod_015", orderId: "ord_002", quantity: 2, startDate: past(10), endDate: past(7), isActive: false },
    { id: "res_004", productId: "prod_007", orderId: "ord_003", quantity: 20, startDate: past(22), endDate: inFuture(62), isActive: true },
    { id: "res_005", productId: "prod_002", orderId: "ord_004", quantity: 1, startDate: past(15), endDate: past(8), isActive: true },
    { id: "res_006", productId: "prod_019", orderId: "ord_005", quantity: 2, startDate: past(10), endDate: past(3), isActive: true },
    { id: "res_007", productId: "prod_004", orderId: "ord_005", quantity: 1, startDate: past(10), endDate: inFuture(18), isActive: true },
    { id: "res_008", productId: "prod_016", orderId: "ord_006", quantity: 1, startDate: past(30), endDate: past(28), isActive: false },
    { id: "res_009", productId: "prod_008", orderId: "ord_007", quantity: 5, startDate: past(5), endDate: inFuture(9), isActive: true },
    { id: "res_010", productId: "prod_017", orderId: "ord_008", quantity: 1, startDate: inFuture(2), endDate: inFuture(5), isActive: true },
    // Quotation-based reservations
    { id: "res_011", productId: "prod_016", quotationId: "quot_006", quantity: 1, startDate: inFuture(7), endDate: inFuture(10), isActive: true },
    { id: "res_012", productId: "prod_018", quotationId: "quot_008", quantity: 1, startDate: inFuture(5), endDate: inFuture(7), isActive: true },
  ];

  for (const r of reservations) {
    await prisma.reservation.create({ data: r });
  }

  // ═══════════════════════════════════════════════════════════════
  //  17. PICKUPS
  // ═══════════════════════════════════════════════════════════════
  console.log("🚚 Creating Pickups...");

  const pickups = [
    { id: "pk_001", pickupNumber: "PK-2026-0001", orderId: "ord_001", status: "PICKED_UP" as const, scheduledDate: past(18), actualPickupDate: past(18), handledBy: "Vendor: Amit Patel", notes: "Delivered to site on time" },
    { id: "pk_002", pickupNumber: "PK-2026-0002", orderId: "ord_002", status: "DELIVERED" as const, scheduledDate: past(10), actualPickupDate: past(10), handledBy: "Staff: Rajesh Kumar", notes: "Delivered to event venue" },
    { id: "pk_003", pickupNumber: "PK-2026-0003", orderId: "ord_003", status: "DELIVERED" as const, scheduledDate: past(22), actualPickupDate: past(22), handledBy: "Courier: BlueDart", notes: "Bulk laptop shipment" },
    { id: "pk_004", pickupNumber: "PK-2026-0004", orderId: "ord_004", status: "PICKED_UP" as const, scheduledDate: past(14), actualPickupDate: past(14), handledBy: "Vendor: Amit Patel" },
    { id: "pk_005", pickupNumber: "PK-2026-0005", orderId: "ord_005", status: "SCHEDULED" as const, scheduledDate: inFuture(1) },
    { id: "pk_006", pickupNumber: "PK-2026-0006", orderId: "ord_006", status: "PICKED_UP" as const, scheduledDate: past(30), actualPickupDate: past(30), handledBy: "Vendor: Suresh Reddy" },
    { id: "pk_007", pickupNumber: "PK-2026-0007", orderId: "ord_007", status: "DELIVERED" as const, scheduledDate: past(5), actualPickupDate: past(5), handledBy: "Staff: Mohan Singh", notes: "5 laptops delivered to Connaught Place office" },
    { id: "pk_008", pickupNumber: "PK-2026-0008", orderId: "ord_008", status: "PENDING" as const, scheduledDate: inFuture(2) },
  ];

  for (const pk of pickups) {
    await prisma.pickup.create({ data: pk });
  }

  // ═══════════════════════════════════════════════════════════════
  //  18. RETURNS
  // ═══════════════════════════════════════════════════════════════
  console.log("🔄 Creating Returns...");

  const returns = [
    { id: "ret_001", returnNumber: "RT-2026-0001", orderId: "ord_001", status: "COMPLETED" as const, scheduledDate: past(12), actualReturnDate: past(11), condition: "Good", lateFee: 0, damageFee: 0, depositRefund: 25000, handledBy: "Vendor: Amit Patel", notes: "Equipment returned in good condition" },
    { id: "ret_002", returnNumber: "RT-2026-0002", orderId: "ord_002", status: "COMPLETED" as const, scheduledDate: past(7), actualReturnDate: past(6), condition: "Good", lateFee: 0, damageFee: 0, depositRefund: 10000, handledBy: "Staff: Rajesh Kumar", notes: "All event equipment returned" },
    { id: "ret_003", returnNumber: "RT-2026-0003", orderId: "ord_006", status: "COMPLETED" as const, scheduledDate: past(28), actualReturnDate: past(27), condition: "Like New", lateFee: 0, damageFee: 0, depositRefund: 8000, handledBy: "Vendor: Suresh Reddy" },
    { id: "ret_004", returnNumber: "RT-2026-0004", orderId: "ord_004", status: "PENDING" as const, scheduledDate: inFuture(3), condition: null, lateFee: 0, damageFee: 0, depositRefund: 0 },
    { id: "ret_005", returnNumber: "RT-2026-0005", orderId: "ord_003", status: "SCHEDULED" as const, scheduledDate: inFuture(62), condition: null, lateFee: 0, damageFee: 0, depositRefund: 0, notes: "Bulk laptop return scheduled after project ends" },
  ];

  const returnModel = (prisma as any).return;
  for (const ret of returns) {
    await returnModel.create({
      data: {
        id: ret.id,
        returnNumber: ret.returnNumber,
        orderId: ret.orderId,
        status: ret.status,
        scheduledDate: ret.scheduledDate,
        actualReturnDate: ret.actualReturnDate ?? undefined,
        condition: ret.condition ?? undefined,
        lateFee: ret.lateFee,
        damageFee: ret.damageFee,
        depositRefund: ret.depositRefund,
        handledBy: ret.handledBy ?? undefined,
        notes: ret.notes ?? undefined,
      },
    });
  }

  // ═══════════════════════════════════════════════════════════════
  //  19. INVOICES & INVOICE ITEMS
  // ═══════════════════════════════════════════════════════════════
  console.log("🧾 Creating Invoices...");

  const invoices = [
    { id: "inv_i01", invoiceNumber: "INV-2026-0001", orderId: "ord_001", customerId: "cust_001", status: "PAID" as const, subtotal: 51000, taxAmount: 9180, totalAmount: 60180, paidAmount: 60180, dueDate: past(10), paidAt: past(18), notes: "Excavator rental" },
    { id: "inv_i02", invoiceNumber: "INV-2026-0002", orderId: "ord_002", customerId: "cust_002", status: "PAID" as const, subtotal: 14800, taxAmount: 2664, discountAmount: 500, totalAmount: 16964, paidAmount: 16964, dueDate: past(5), paidAt: past(12), notes: "Event equipment" },
    { id: "inv_i03", invoiceNumber: "INV-2026-0003", orderId: "ord_003", customerId: "cust_003", status: "PARTIALLY_PAID" as const, subtotal: 84000, taxAmount: 15120, discountAmount: 2000, totalAmount: 97120, paidAmount: 50000, dueDate: inFuture(30), notes: "Laptop fleet - partial payment" },
    { id: "inv_i04", invoiceNumber: "INV-2026-0004", orderId: "ord_004", customerId: "cust_005", status: "PAID" as const, subtotal: 42000, taxAmount: 7560, totalAmount: 49560, paidAmount: 49560, dueDate: past(5), paidAt: past(14), notes: "Backhoe loader rental" },
    { id: "inv_i05", invoiceNumber: "INV-2026-0005", orderId: "ord_005", customerId: "cust_007", status: "SENT" as const, subtotal: 19000, taxAmount: 3420, discountAmount: 1000, totalAmount: 21420, paidAmount: 0, dueDate: inFuture(15), notes: "Generator & scaffolding" },
    { id: "inv_i06", invoiceNumber: "INV-2026-0006", orderId: "ord_006", customerId: "cust_008", status: "PAID" as const, subtotal: 4400, taxAmount: 792, totalAmount: 5192, paidAmount: 5192, dueDate: past(20), paidAt: past(28), notes: "Canon camera rental" },
    { id: "inv_i07", invoiceNumber: "INV-2026-0007", orderId: "ord_007", customerId: "cust_002", status: "DRAFT" as const, subtotal: 6000, taxAmount: 1080, totalAmount: 7080, paidAmount: 0, dueDate: inFuture(10), notes: "HP Laptop fleet" },
    { id: "inv_i08", invoiceNumber: "INV-2026-0008", orderId: "ord_008", customerId: "cust_004", status: "SENT" as const, subtotal: 5400, taxAmount: 972, totalAmount: 6372, paidAmount: 0, dueDate: inFuture(5), notes: "Sony camera rental" },
  ];

  for (const inv of invoices) {
    await prisma.invoice.create({ data: inv });
  }

  // Invoice Items
  const invoiceItems = [
    { id: "ii_001", invoiceId: "inv_i01", description: "CAT 320 Excavator - 6 days rental", quantity: 1, unitPrice: 8500, totalPrice: 51000 },
    { id: "ii_002", invoiceId: "inv_i01", description: "GST @18%", quantity: 1, unitPrice: 9180, totalPrice: 9180 },
    { id: "ii_003", invoiceId: "inv_i02", description: "JBL VTX A12 Line Array - 3 days", quantity: 1, unitPrice: 2800, totalPrice: 8400 },
    { id: "ii_004", invoiceId: "inv_i02", description: "LED Stage Light Kit x2 - 3 days", quantity: 2, unitPrice: 600, totalPrice: 3600 },
    { id: "ii_005", invoiceId: "inv_i02", description: "Yamaha TF5 Mixer - 2 days", quantity: 1, unitPrice: 1500, totalPrice: 2800 },
    { id: "ii_006", invoiceId: "inv_i03", description: "Dell Latitude 5540 x20 - 12 weeks", quantity: 20, unitPrice: 7000, totalPrice: 84000 },
    { id: "ii_007", invoiceId: "inv_i04", description: "JCB 3CX Backhoe - 7 days", quantity: 1, unitPrice: 6000, totalPrice: 42000 },
    { id: "ii_008", invoiceId: "inv_i05", description: "Portable Generator 10KVA x2 - 7 days", quantity: 2, unitPrice: 950, totalPrice: 13300 },
    { id: "ii_009", invoiceId: "inv_i05", description: "Steel Scaffolding Set - 4 weeks", quantity: 1, unitPrice: 2200, totalPrice: 5700 },
    { id: "ii_010", invoiceId: "inv_i06", description: "Canon EOS R5 Kit - 2 days", quantity: 1, unitPrice: 2200, totalPrice: 4400 },
    { id: "ii_011", invoiceId: "inv_i07", description: "HP ProBook 450 G10 x5 - 2 weeks", quantity: 5, unitPrice: 800, totalPrice: 6000 },
    { id: "ii_012", invoiceId: "inv_i08", description: "Sony A7 IV Camera - 3 days", quantity: 1, unitPrice: 1800, totalPrice: 5400 },
  ];

  for (const ii of invoiceItems) {
    await prisma.invoiceItem.create({ data: ii });
  }

  // ═══════════════════════════════════════════════════════════════
  //  20. PAYMENTS
  // ═══════════════════════════════════════════════════════════════
  console.log("💳 Creating Payments...");

  const payments = [
    // Order 1 - Full payment + Security deposit
    { id: "pay_001", paymentNumber: "PAY-2026-0001", orderId: "ord_001", invoiceId: "inv_i01", customerId: "cust_001", amount: 60180, paymentType: "FULL_PAYMENT" as const, status: "COMPLETED" as const, paymentMethod: "UPI", transactionId: "RZP_TXN_001ABC", paidAt: past(18), gatewayResponse: { razorpay_payment_id: "pay_xxx001", status: "captured" } },
    { id: "pay_002", paymentNumber: "PAY-2026-0002", orderId: "ord_001", customerId: "cust_001", amount: 25000, paymentType: "SECURITY_DEPOSIT" as const, status: "COMPLETED" as const, paymentMethod: "Net Banking", transactionId: "RZP_TXN_002ABC", paidAt: past(18), gatewayResponse: { razorpay_payment_id: "pay_xxx002", status: "captured" } },
    // Order 2 - Full payment + Security deposit
    { id: "pay_003", paymentNumber: "PAY-2026-0003", orderId: "ord_002", invoiceId: "inv_i02", customerId: "cust_002", amount: 16964, paymentType: "FULL_PAYMENT" as const, status: "COMPLETED" as const, paymentMethod: "Credit Card", transactionId: "RZP_TXN_003DEF", paidAt: past(12), gatewayResponse: { razorpay_payment_id: "pay_xxx003", status: "captured" } },
    { id: "pay_004", paymentNumber: "PAY-2026-0004", orderId: "ord_002", customerId: "cust_002", amount: 10000, paymentType: "SECURITY_DEPOSIT" as const, status: "REFUNDED" as const, paymentMethod: "Credit Card", transactionId: "RZP_TXN_004DEF", paidAt: past(12), gatewayResponse: { razorpay_payment_id: "pay_xxx004", status: "refunded" } },
    // Order 3 - Partial payment
    { id: "pay_005", paymentNumber: "PAY-2026-0005", orderId: "ord_003", invoiceId: "inv_i03", customerId: "cust_003", amount: 50000, paymentType: "PARTIAL_PAYMENT" as const, status: "COMPLETED" as const, paymentMethod: "Net Banking", transactionId: "RZP_TXN_005GHI", paidAt: past(22), gatewayResponse: { razorpay_payment_id: "pay_xxx005", status: "captured" } },
    { id: "pay_006", paymentNumber: "PAY-2026-0006", orderId: "ord_003", customerId: "cust_003", amount: 50000, paymentType: "SECURITY_DEPOSIT" as const, status: "COMPLETED" as const, paymentMethod: "UPI", transactionId: "RZP_TXN_006GHI", paidAt: past(22), gatewayResponse: { razorpay_payment_id: "pay_xxx006", status: "captured" } },
    // Order 4 - Full payment
    { id: "pay_007", paymentNumber: "PAY-2026-0007", orderId: "ord_004", invoiceId: "inv_i04", customerId: "cust_005", amount: 49560, paymentType: "FULL_PAYMENT" as const, status: "COMPLETED" as const, paymentMethod: "UPI", transactionId: "RZP_TXN_007JKL", paidAt: past(14), gatewayResponse: { razorpay_payment_id: "pay_xxx007", status: "captured" } },
    { id: "pay_008", paymentNumber: "PAY-2026-0008", orderId: "ord_004", customerId: "cust_005", amount: 18000, paymentType: "SECURITY_DEPOSIT" as const, status: "COMPLETED" as const, paymentMethod: "UPI", transactionId: "RZP_TXN_008JKL", paidAt: past(14) },
    // Order 5 - Full payment
    { id: "pay_009", paymentNumber: "PAY-2026-0009", orderId: "ord_005", customerId: "cust_007", amount: 21420, paymentType: "FULL_PAYMENT" as const, status: "COMPLETED" as const, paymentMethod: "Debit Card", transactionId: "RZP_TXN_009MNO", paidAt: past(10) },
    { id: "pay_010", paymentNumber: "PAY-2026-0010", orderId: "ord_005", customerId: "cust_007", amount: 9000, paymentType: "SECURITY_DEPOSIT" as const, status: "COMPLETED" as const, paymentMethod: "Debit Card", transactionId: "RZP_TXN_010MNO", paidAt: past(10) },
    // Order 6
    { id: "pay_011", paymentNumber: "PAY-2026-0011", orderId: "ord_006", invoiceId: "inv_i06", customerId: "cust_008", amount: 5192, paymentType: "FULL_PAYMENT" as const, status: "COMPLETED" as const, paymentMethod: "UPI", transactionId: "RZP_TXN_011PQR", paidAt: past(28) },
    { id: "pay_012", paymentNumber: "PAY-2026-0012", orderId: "ord_006", customerId: "cust_008", amount: 8000, paymentType: "SECURITY_DEPOSIT" as const, status: "REFUNDED" as const, paymentMethod: "UPI", transactionId: "RZP_TXN_012PQR", paidAt: past(28) },
    // Order 7
    { id: "pay_013", paymentNumber: "PAY-2026-0013", orderId: "ord_007", customerId: "cust_002", amount: 7080, paymentType: "FULL_PAYMENT" as const, status: "COMPLETED" as const, paymentMethod: "Credit Card", transactionId: "RZP_TXN_013STU", paidAt: past(5) },
    { id: "pay_014", paymentNumber: "PAY-2026-0014", orderId: "ord_007", customerId: "cust_002", amount: 3500, paymentType: "SECURITY_DEPOSIT" as const, status: "COMPLETED" as const, paymentMethod: "Credit Card", transactionId: "RZP_TXN_014STU", paidAt: past(5) },
    // Order 8
    { id: "pay_015", paymentNumber: "PAY-2026-0015", orderId: "ord_008", customerId: "cust_004", amount: 6372, paymentType: "FULL_PAYMENT" as const, status: "COMPLETED" as const, paymentMethod: "Net Banking", transactionId: "RZP_TXN_015VWX", paidAt: past(2) },
    // Failed payment attempt
    { id: "pay_016", paymentNumber: "PAY-2026-0016", orderId: "ord_009", customerId: "cust_006", amount: 11210, paymentType: "FULL_PAYMENT" as const, status: "FAILED" as const, paymentMethod: "Credit Card", transactionId: "RZP_TXN_016FAIL", gatewayResponse: { error: "Card declined", code: "BAD_REQUEST_ERROR" } },
  ];

  for (const pay of payments) {
    await prisma.payment.create({ data: pay });
  }

  // ═══════════════════════════════════════════════════════════════
  //  21. SYSTEM SETTINGS
  // ═══════════════════════════════════════════════════════════════
  console.log("⚙️  Creating System Settings...");

  const settings = [
    { id: "ss_001", key: "company_name", value: "Rentora", description: "Platform company name" },
    { id: "ss_002", key: "company_email", value: "admin@rentora.com", description: "Platform contact email" },
    { id: "ss_003", key: "company_phone", value: "+91-1800-555-0199", description: "Platform helpline number" },
    { id: "ss_004", key: "currency", value: "INR", description: "Default currency" },
    { id: "ss_005", key: "currency_symbol", value: "₹", description: "Currency display symbol" },
    { id: "ss_006", key: "tax_rate", value: "18", description: "Default GST rate (%)" },
    { id: "ss_007", key: "min_rental_hours", value: "4", description: "Minimum rental duration in hours" },
    { id: "ss_008", key: "max_rental_days", value: "365", description: "Maximum rental duration in days" },
    { id: "ss_009", key: "late_fee_per_day", value: "500", description: "Late return fee per day (₹)" },
    { id: "ss_010", key: "security_deposit_percent", value: "30", description: "Default security deposit percentage" },
    { id: "ss_011", key: "invoice_prefix", value: "INV", description: "Invoice number prefix" },
    { id: "ss_012", key: "order_prefix", value: "RO", description: "Order number prefix" },
    { id: "ss_013", key: "quotation_prefix", value: "QT", description: "Quotation number prefix" },
    { id: "ss_014", key: "payment_gateway", value: "razorpay", description: "Active payment gateway" },
    { id: "ss_015", key: "auto_cancel_hours", value: "48", description: "Auto-cancel unpaid orders after hours" },
  ];

  for (const s of settings) {
    await prisma.systemSettings.create({ data: s });
  }

  // ═══════════════════════════════════════════════════════════════
  //  22. TAX CONFIG
  // ═══════════════════════════════════════════════════════════════
  console.log("📜 Creating Tax Config...");

  const taxes = [
    { id: "tax_001", name: "CGST", rate: 9.00, isActive: true },
    { id: "tax_002", name: "SGST", rate: 9.00, isActive: true },
    { id: "tax_003", name: "IGST", rate: 18.00, isActive: true },
    { id: "tax_004", name: "GST (Reduced)", rate: 12.00, isActive: false },
    { id: "tax_005", name: "GST (Low)", rate: 5.00, isActive: false },
  ];

  for (const t of taxes) {
    await prisma.taxConfig.create({ data: t });
  }

  // ═══════════════════════════════════════════════════════════════
  //  23. COUPONS
  // ═══════════════════════════════════════════════════════════════
  console.log("🎫 Creating Coupons...");

  const coupons = [
    { id: "cpn_001", code: "WELCOME10", description: "10% off for new users", discountType: "PERCENTAGE", discountValue: 10, minOrderValue: 1000, maxDiscount: 5000, usageLimit: 500, usedCount: 127, validFrom: past(60), validUntil: inFuture(120), isActive: true },
    { id: "cpn_002", code: "FLAT2000", description: "₹2000 flat off on orders above ₹15000", discountType: "FIXED", discountValue: 2000, minOrderValue: 15000, maxDiscount: 2000, usageLimit: 200, usedCount: 64, validFrom: past(30), validUntil: inFuture(60), isActive: true },
    { id: "cpn_003", code: "MEGA25", description: "25% off mega sale", discountType: "PERCENTAGE", discountValue: 25, minOrderValue: 5000, maxDiscount: 15000, usageLimit: 100, usedCount: 89, validFrom: past(40), validUntil: past(10), isActive: false },
    { id: "cpn_004", code: "FIRSTORDER", description: "₹500 off first order", discountType: "FIXED", discountValue: 500, minOrderValue: 2000, maxDiscount: 500, usageLimit: 1000, usedCount: 312, validFrom: past(90), validUntil: inFuture(90), isActive: true },
    { id: "cpn_005", code: "LONGTERM15", description: "15% off rentals over 30 days", discountType: "PERCENTAGE", discountValue: 15, minOrderValue: 10000, maxDiscount: 20000, usageLimit: 50, usedCount: 18, validFrom: past(20), validUntil: inFuture(45), isActive: true },
    { id: "cpn_006", code: "SUMMER2026", description: "Summer special - 20% off", discountType: "PERCENTAGE", discountValue: 20, minOrderValue: 3000, maxDiscount: 10000, usageLimit: 300, usedCount: 0, validFrom: inFuture(90), validUntil: inFuture(180), isActive: true },
  ];

  for (const c of coupons) {
    await prisma.coupon.create({ data: c });
  }

  // ═══════════════════════════════════════════════════════════════
  //  24. NOTIFICATIONS
  // ═══════════════════════════════════════════════════════════════
  console.log("🔔 Creating Notifications...");

  const notifications = [
    { id: "notif_001", userId: "cust_001", title: "Order Completed", message: "Your order RO-2026-0001 has been completed. Equipment returned successfully.", type: "ORDER", isRead: true, createdAt: past(10) },
    { id: "notif_002", userId: "cust_001", title: "Security Deposit Refunded", message: "₹25,000 security deposit for order RO-2026-0001 has been refunded.", type: "PAYMENT", isRead: true, createdAt: past(9) },
    { id: "notif_003", userId: "cust_002", title: "Order Confirmed", message: "Your event equipment order RO-2026-0002 is confirmed.", type: "ORDER", isRead: true, createdAt: past(12) },
    { id: "notif_004", userId: "cust_002", title: "Delivery Scheduled", message: "Equipment will be delivered to Connaught Place on scheduled date.", type: "ORDER", isRead: true, createdAt: past(11) },
    { id: "notif_005", userId: "cust_003", title: "Payment Received", message: "Partial payment of ₹50,000 received for order RO-2026-0003.", type: "PAYMENT", isRead: false, createdAt: past(22) },
    { id: "notif_006", userId: "cust_003", title: "Remaining Balance Due", message: "₹47,120 remaining for invoice INV-2026-0003. Due by next month.", type: "REMINDER", isRead: false, createdAt: past(5) },
    { id: "notif_007", userId: "cust_005", title: "Order Completed", message: "Backhoe loader rental order RO-2026-0004 is in progress.", type: "ORDER", isRead: true, createdAt: past(14) },
    { id: "notif_008", userId: "cust_007", title: "Pickup Scheduled", message: "Pickup for order RO-2026-0005 is scheduled for tomorrow.", type: "ORDER", isRead: false, createdAt: past(0) },
    { id: "notif_009", userId: "cust_004", title: "New Quotation", message: "Your quotation QT-2026-0006 for Canon camera is ready for review.", type: "ORDER", isRead: false, createdAt: past(3) },
    { id: "notif_010", userId: "vendor_001", title: "New Order Received", message: "New order RO-2026-0001 for CAT 320 Excavator from Vikram Singh.", type: "ORDER", isRead: true, createdAt: past(20) },
    { id: "notif_011", userId: "vendor_001", title: "Equipment Returned", message: "CAT 320 Excavator returned in good condition. Order RO-2026-0001.", type: "RETURN", isRead: true, createdAt: past(11) },
    { id: "notif_012", userId: "vendor_002", title: "Bulk Order Alert", message: "New order for 20 Dell laptops from Mehta IT Solutions.", type: "ORDER", isRead: true, createdAt: past(25) },
    { id: "notif_013", userId: "vendor_002", title: "Payment Confirmation", message: "₹50,000 partial payment received for order RO-2026-0003.", type: "PAYMENT", isRead: false, createdAt: past(22) },
    { id: "notif_014", userId: "vendor_003", title: "Equipment Return Due", message: "Return for camera order RO-2026-0006 was completed.", type: "RETURN", isRead: true, createdAt: past(27) },
    { id: "notif_015", userId: "admin_001", title: "New Vendor Registered", message: "Heavy Machines Co. registered as a vendor. Verification pending.", type: "ORDER", isRead: true, createdAt: past(45) },
    { id: "notif_016", userId: "admin_001", title: "Monthly Revenue Report", message: "February 2026 revenue: ₹2,45,916. 10 orders processed.", type: "REMINDER", isRead: false, createdAt: past(1) },
    { id: "notif_017", userId: "cust_006", title: "Order Cancelled", message: "Your order RO-2026-0009 has been cancelled.", type: "ORDER", isRead: true, createdAt: past(8) },
    { id: "notif_018", userId: "cust_008", title: "Quotation Sent", message: "Quotation QT-2026-0008 for drone rental has been sent.", type: "ORDER", isRead: false, createdAt: past(2) },
  ];

  for (const n of notifications) {
    await prisma.notification.create({ data: n });
  }

  // ═══════════════════════════════════════════════════════════════
  //  25. AUDIT LOGS
  // ═══════════════════════════════════════════════════════════════
  console.log("📝 Creating Audit Logs...");

  const auditLogs = [
    { id: "al_001", userId: "admin_001", action: "CREATE", entityType: "User", entityId: "vendor_001", newValue: { role: "VENDOR", email: "amit@rentequip.com" }, createdAt: past(50) },
    { id: "al_002", userId: "admin_001", action: "CREATE", entityType: "User", entityId: "vendor_002", newValue: { role: "VENDOR", email: "priya@techrent.in" }, createdAt: past(48) },
    { id: "al_003", userId: "admin_001", action: "UPDATE", entityType: "VendorProfile", entityId: "vp_001", oldValue: { isVerified: false }, newValue: { isVerified: true }, createdAt: past(45) },
    { id: "al_004", userId: "vendor_001", action: "CREATE", entityType: "Product", entityId: "prod_001", newValue: { name: "CAT 320 Excavator", sku: "RE-EXC-001" }, createdAt: past(40) },
    { id: "al_005", userId: "vendor_002", action: "CREATE", entityType: "Product", entityId: "prod_007", newValue: { name: "Dell Latitude 5540", sku: "TR-LAP-007" }, createdAt: past(38) },
    { id: "al_006", userId: "cust_001", action: "CREATE", entityType: "Quotation", entityId: "quot_001", newValue: { quotationNumber: "QT-2026-0001", totalAmount: 60180 }, createdAt: past(20) },
    { id: "al_007", userId: "cust_001", action: "UPDATE", entityType: "Quotation", entityId: "quot_001", oldValue: { status: "DRAFT" }, newValue: { status: "CONFIRMED" }, createdAt: past(20) },
    { id: "al_008", userId: "cust_001", action: "CREATE", entityType: "RentalOrder", entityId: "ord_001", newValue: { orderNumber: "RO-2026-0001", totalAmount: 60180 }, createdAt: past(20) },
    { id: "al_009", userId: null, action: "CREATE", entityType: "Payment", entityId: "pay_001", newValue: { paymentNumber: "PAY-2026-0001", amount: 60180, status: "COMPLETED" }, ipAddress: "103.21.58.12", createdAt: past(18) },
    { id: "al_010", userId: "vendor_001", action: "UPDATE", entityType: "RentalOrder", entityId: "ord_001", oldValue: { status: "IN_PROGRESS" }, newValue: { status: "COMPLETED" }, createdAt: past(10) },
    { id: "al_011", userId: "cust_002", action: "CREATE", entityType: "Quotation", entityId: "quot_002", newValue: { quotationNumber: "QT-2026-0002" }, createdAt: past(15) },
    { id: "al_012", userId: "cust_003", action: "CREATE", entityType: "RentalOrder", entityId: "ord_003", newValue: { orderNumber: "RO-2026-0003", totalAmount: 97120 }, createdAt: past(25) },
    { id: "al_013", userId: "vendor_002", action: "UPDATE", entityType: "Product", entityId: "prod_007", oldValue: { quantity: 40 }, newValue: { quantity: 50 }, createdAt: past(30) },
    { id: "al_014", userId: "admin_001", action: "CREATE", entityType: "Coupon", entityId: "cpn_001", newValue: { code: "WELCOME10", discountValue: 10 }, createdAt: past(60) },
    { id: "al_015", userId: "admin_001", action: "UPDATE", entityType: "SystemSettings", entityId: "ss_006", oldValue: { value: "15" }, newValue: { value: "18" }, createdAt: past(35) },
    { id: "al_016", userId: "cust_006", action: "UPDATE", entityType: "RentalOrder", entityId: "ord_009", oldValue: { status: "DRAFT" }, newValue: { status: "CANCELLED" }, createdAt: past(8) },
    { id: "al_017", userId: "vendor_003", action: "CREATE", entityType: "Product", entityId: "prod_013", newValue: { name: "JBL VTX A12 Line Array", sku: "HM-SND-013" }, createdAt: past(36) },
    { id: "al_018", userId: "admin_001", action: "DELETE", entityType: "Coupon", entityId: "cpn_old_001", oldValue: { code: "EXPIRED2025" }, createdAt: past(15) },
    { id: "al_019", userId: "vendor_001", action: "UPDATE", entityType: "Inventory", entityId: "inv_001", oldValue: { quantity: 5 }, newValue: { quantity: 3, location: "IN_WAREHOUSE" }, createdAt: past(18) },
    { id: "al_020", userId: "cust_004", action: "CREATE", entityType: "Quotation", entityId: "quot_006", newValue: { quotationNumber: "QT-2026-0006", totalAmount: 7788 }, createdAt: past(3) },
  ];

  for (const al of auditLogs) {
    await prisma.auditLog.create({
      data: {
        id: al.id,
        userId: al.userId,
        action: al.action,
        entityType: al.entityType,
        entityId: al.entityId,
        oldValue: al.oldValue ?? undefined,
        newValue: al.newValue ?? undefined,
        ipAddress: (al as any).ipAddress ?? null,
        createdAt: al.createdAt,
      },
    });
  }

  // ═══════════════════════════════════════════════════════════════
  //  26. TOKENS (verification tokens)
  // ═══════════════════════════════════════════════════════════════
  console.log("🔑 Creating Tokens...");

  const tokens = [
    { id: "tok_001", email: "newuser1@gmail.com", token: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", type: "EmailVerification" as const, expires: inFuture(1) },
    { id: "tok_002", email: "kavita@yahoo.com", token: "f6e5d4c3-b2a1-0987-dcba-0987654321fe", type: "PasswordReset" as const, expires: inFuture(0.5) },
    { id: "tok_003", email: "expired@test.com", token: "11223344-5566-7788-9900-aabbccddeeff", type: "EmailVerification" as const, expires: past(2) },
  ];

  for (const t of tokens) {
    await prisma.token.create({ data: t });
  }

  // ═══════════════════════════════════════════════════════════════
  //  27. SESSIONS
  // ═══════════════════════════════════════════════════════════════
  console.log("🔐 Creating Sessions...");

  const sessions = [
    { id: "ses_001", sessionToken: "session-token-admin-001-abc123", userId: "admin_001", expires: inFuture(7) },
    { id: "ses_002", sessionToken: "session-token-vendor-001-def456", userId: "vendor_001", expires: inFuture(5) },
    { id: "ses_003", sessionToken: "session-token-cust-001-ghi789", userId: "cust_001", expires: inFuture(3) },
    { id: "ses_004", sessionToken: "session-token-cust-003-jkl012", userId: "cust_003", expires: inFuture(6) },
  ];

  for (const s of sessions) {
    await prisma.session.create({ data: s });
  }

  // ═══════════════════════════════════════════════════════════════
  //  SUMMARY
  // ═══════════════════════════════════════════════════════════════
  console.log("\n✅ Seed completed successfully!\n");
  console.log("📊 Data Summary:");
  console.log("─────────────────────────────────────");
  console.log(`  Users:               12 (1 Admin, 3 Vendors, 8 Customers)`);
  console.log(`  Vendor Profiles:     3`);
  console.log(`  Addresses:           10`);
  console.log(`  Categories:          18 (6 parent + 12 sub)`);
  console.log(`  Product Attributes:  5 (with 25 values)`);
  console.log(`  Products:            20`);
  console.log(`  Product Images:      22`);
  console.log(`  Product Variants:    11`);
  console.log(`  Variant Attributes:  14`);
  console.log(`  Rental Pricing:      34`);
  console.log(`  Inventory:           30`);
  console.log(`  Carts:               3 (with 6 items)`);
  console.log(`  Wishlists:           15`);
  console.log(`  Quotations:          10 (with 13 items)`);
  console.log(`  Rental Orders:       10 (with 13 items)`);
  console.log(`  Reservations:        12`);
  console.log(`  Pickups:             8`);
  console.log(`  Returns:             5`);
  console.log(`  Invoices:            8 (with 12 items)`);
  console.log(`  Payments:            16`);
  console.log(`  System Settings:     15`);
  console.log(`  Tax Configs:         5`);
  console.log(`  Coupons:             6`);
  console.log(`  Notifications:       18`);
  console.log(`  Audit Logs:          20`);
  console.log(`  Tokens:              3`);
  console.log(`  Sessions:            4`);
  console.log("─────────────────────────────────────");
  console.log(`  TOTAL RECORDS:       ~340+`);
  console.log("\n🔐 Login Credentials (all users):");
  console.log("   Password: Password@123");
  console.log("\n   Admin:    admin@rentora.com");
  console.log("   Vendor 1: amit@rentequip.com");
  console.log("   Vendor 2: priya@techrent.in");
  console.log("   Vendor 3: suresh@heavymachines.com");
  console.log("   Customer: vikram@gmail.com (and 7 more)");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    console.error("Stack:", e.stack);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
