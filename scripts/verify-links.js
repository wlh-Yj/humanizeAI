#!/usr/bin/env node

/**
 * HumanizeAI - Link Verification Script
 * 检查所有页面和链接的完整性
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 HumanizeAI - 链接和页面完整性检查\n');

// 检查的页面列表
const pagesToCheck = [
  { path: 'app/page.tsx', name: 'Home Page', route: '/' },
  { path: 'app/pricing/page.tsx', name: 'Pricing Page', route: '/pricing' },
  { path: 'app/settings/page.tsx', name: 'Settings Page', route: '/settings' },
  { path: 'app/privacy/page.tsx', name: 'Privacy Policy', route: '/privacy' },
  { path: 'app/terms/page.tsx', name: 'Terms of Service', route: '/terms' },
  { path: 'app/contact/page.tsx', name: 'Contact Page', route: '/contact' },
  { path: 'app/success/page.tsx', name: 'Success Page', route: '/success' },
];

// 检查的组件
const componentsToCheck = [
  { path: 'components/header.tsx', name: 'Header Component' },
  { path: 'components/footer.tsx', name: 'Footer Component' },
  { path: 'components/testimonials-section.tsx', name: 'Testimonials Section' },
  { path: 'components/checkout-button.tsx', name: 'Checkout Button' },
];

// 图标和资源
const assetsToCheck = [
  { path: 'app/icon.svg', name: 'App Icon (Favicon)' },
  { path: 'public/favicon.svg', name: 'Public Favicon' },
  { path: 'components/humanize-icon.tsx', name: 'Brand Icon Component' },
];

// API 路由
const apiRoutes = [
  { path: 'app/api/checkout/route.ts', name: 'Checkout API' },
  { path: 'app/api/webhooks/creem/route.ts', name: 'Creem Webhook Handler' },
  { path: 'app/api/humanize/route.ts', name: 'Humanize API' },
];

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function checkFile(filePath, name) {
  totalChecks++;
  const fullPath = path.join(process.cwd(), filePath);

  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${name}`);
    console.log(`   📁 ${filePath}`);
    passedChecks++;
    return true;
  } else {
    console.log(`❌ ${name}`);
    console.log(`   📁 ${filePath} - NOT FOUND`);
    failedChecks++;
    return false;
  }
}

function checkFooterLinks() {
  console.log('\n📋 检查 Footer 链接...\n');

  const footerPath = path.join(process.cwd(), 'components/footer.tsx');
  if (!fs.existsSync(footerPath)) {
    console.log('❌ Footer 组件不存在');
    return;
  }

  const footerContent = fs.readFileSync(footerPath, 'utf-8');

  // 检查是否有 # 死链接
  totalChecks++;
  const hashLinks = footerContent.match(/href="#"/g);
  if (hashLinks) {
    console.log(`❌ 发现 ${hashLinks.length} 个死链接 (href="#")`);
    failedChecks++;
  } else {
    console.log('✅ 无死链接 (href="#")');
    passedChecks++;
  }

  // 检查有效链接
  const validLinks = [
    { pattern: 'href="/"', name: 'Home' },
    { pattern: 'href="/#features"', name: 'Features' },
    { pattern: 'href="/privacy"', name: 'Privacy' },
    { pattern: 'href="/terms"', name: 'Terms' },
    { pattern: 'href="/contact"', name: 'Contact' },
    { pattern: 'href="/pricing"', name: 'Pricing' },
    { pattern: 'href="/#faq"', name: 'FAQ' },
  ];

  console.log('\n有效链接：');
  validLinks.forEach(link => {
    totalChecks++;
    if (footerContent.includes(link.pattern)) {
      console.log(`✅ ${link.name}: ${link.pattern}`);
      passedChecks++;
    } else {
      console.log(`⚠️  ${link.name}: ${link.pattern} - 未找到`);
    }
  });
}

function checkTestimonials() {
  console.log('\n💬 检查 Testimonials 免责声明...\n');

  const testimonialsPath = path.join(process.cwd(), 'components/testimonials-section.tsx');
  if (!fs.existsSync(testimonialsPath)) {
    console.log('❌ Testimonials 组件不存在');
    return;
  }

  const content = fs.readFileSync(testimonialsPath, 'utf-8');
  totalChecks++;

  if (content.includes('return null') ||
      content.includes('Example testimonials for demonstration purposes') ||
      content.includes('example') ||
      content.includes('demo')) {
    console.log('✅ Testimonials 未展示或已包含免责声明');
    passedChecks++;
  } else {
    console.log('❌ 未找到免责声明');
    failedChecks++;
  }
}

function checkIcons() {
  console.log('\n🎨 检查图标和资源...\n');

  assetsToCheck.forEach(asset => {
    checkFile(asset.path, asset.name);
  });

  // 检查 layout.tsx 中的图标配置
  const layoutPath = path.join(process.cwd(), 'app/layout.tsx');
  if (fs.existsSync(layoutPath)) {
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    totalChecks++;

    if (layoutContent.includes('icons:') && layoutContent.includes('favicon')) {
      console.log('✅ Layout.tsx 图标配置正确');
      passedChecks++;
    } else {
      console.log('⚠️  Layout.tsx 可能缺少图标配置');
    }
  }
}

// 主程序
console.log('═══════════════════════════════════════════════════\n');
console.log('📄 检查页面文件...\n');
pagesToCheck.forEach(page => {
  checkFile(page.path, `${page.name} (${page.route})`);
});

console.log('\n═══════════════════════════════════════════════════\n');
console.log('🧩 检查组件文件...\n');
componentsToCheck.forEach(component => {
  checkFile(component.path, component.name);
});

console.log('\n═══════════════════════════════════════════════════\n');
console.log('🔌 检查 API 路由...\n');
apiRoutes.forEach(route => {
  checkFile(route.path, route.name);
});

console.log('\n═══════════════════════════════════════════════════');
checkFooterLinks();

console.log('\n═══════════════════════════════════════════════════');
checkTestimonials();

console.log('\n═══════════════════════════════════════════════════');
checkIcons();

// 总结
console.log('\n═══════════════════════════════════════════════════');
console.log('\n📊 检查总结\n');
console.log(`总检查项: ${totalChecks}`);
console.log(`✅ 通过: ${passedChecks}`);
console.log(`❌ 失败: ${failedChecks}`);

const successRate = ((passedChecks / totalChecks) * 100).toFixed(1);
console.log(`\n成功率: ${successRate}%`);

if (failedChecks === 0) {
  console.log('\n🎉 所有检查通过！项目已准备好生产部署。\n');
  process.exit(0);
} else {
  console.log(`\n⚠️  发现 ${failedChecks} 个问题，请修复后重新检查。\n`);
  process.exit(1);
}
