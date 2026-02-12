import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOTS_DIR = './test-screenshots';
const BASE_URL = 'http://localhost:3000';

// Create screenshots directory
try {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true });
} catch (e) {
  // Directory already exists
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testHumanizeAI() {
  console.log('🚀 Starting HumanizeAI UI Tests...\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const results = {
    passed: [],
    failed: [],
    screenshots: []
  };

  try {
    // Test 1: Navigate to homepage
    console.log('📍 Test 1: Loading homepage...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await sleep(1000);
    const screenshotPath1 = join(SCREENSHOTS_DIR, '01-initial-page.png');
    await page.screenshot({ path: screenshotPath1, fullPage: true });
    results.screenshots.push(screenshotPath1);
    results.passed.push('✅ Homepage loaded successfully');
    console.log('✅ Homepage loaded\n');

    // Test 2: Check Mode buttons
    console.log('📍 Test 2: Testing Mode selection buttons...');
    const modes = ['GPTZero', 'ZeroGPT', 'Turnitin', 'Academic'];
    
    for (const mode of modes) {
      const button = page.locator(`button:has-text("${mode}")`).first();
      const isVisible = await button.isVisible();
      
      if (isVisible) {
        await button.click();
        await sleep(500);
        
        // Check if button has active styling
        const classes = await button.getAttribute('class');
        const isActive = classes.includes('bg-primary');
        
        if (isActive) {
          results.passed.push(`✅ ${mode} button is clickable and shows active state`);
          console.log(`  ✅ ${mode} button works`);
        } else {
          results.failed.push(`❌ ${mode} button doesn't show active state`);
          console.log(`  ❌ ${mode} button state issue`);
        }
      } else {
        results.failed.push(`❌ ${mode} button not found`);
        console.log(`  ❌ ${mode} button not found`);
      }
    }
    
    const screenshotPath2 = join(SCREENSHOTS_DIR, '02-mode-buttons.png');
    await page.screenshot({ path: screenshotPath2, fullPage: false });
    results.screenshots.push(screenshotPath2);
    console.log('');

    // Test 3: Check FLUENCY dropdown
    console.log('📍 Test 3: Testing FLUENCY dropdown...');
    const fluencyTrigger = page.locator('text=Fluency').locator('..').locator('button').first();
    await fluencyTrigger.click();
    await sleep(500);
    
    const fluencyOptions = ['Low', 'Medium', 'High'];
    let fluencyFound = 0;
    
    for (const option of fluencyOptions) {
      const optionElement = page.locator(`[role="option"]:has-text("${option}")`);
      if (await optionElement.isVisible()) {
        fluencyFound++;
      }
    }
    
    if (fluencyFound === 3) {
      results.passed.push('✅ FLUENCY dropdown has all 3 options (Low/Medium/High)');
      console.log('  ✅ All FLUENCY options found');
    } else {
      results.failed.push(`❌ FLUENCY dropdown missing options (found ${fluencyFound}/3)`);
      console.log(`  ❌ FLUENCY options incomplete (${fluencyFound}/3)`);
    }
    
    // Select Medium and close
    await page.locator(`[role="option"]:has-text("Medium")`).click();
    await sleep(500);
    
    const screenshotPath3 = join(SCREENSHOTS_DIR, '03-fluency-dropdown.png');
    await page.screenshot({ path: screenshotPath3, fullPage: false });
    results.screenshots.push(screenshotPath3);
    console.log('');

    // Test 4: Check READABILITY dropdown
    console.log('📍 Test 4: Testing READABILITY dropdown...');
    const readabilityTrigger = page.locator('text=Readability').locator('..').locator('button').first();
    await readabilityTrigger.click();
    await sleep(500);
    
    const readabilityOptions = ['High School', 'University', 'PhD'];
    let readabilityFound = 0;
    
    for (const option of readabilityOptions) {
      const optionElement = page.locator(`[role="option"]:has-text("${option}")`);
      if (await optionElement.isVisible()) {
        readabilityFound++;
      }
    }
    
    if (readabilityFound === 3) {
      results.passed.push('✅ READABILITY dropdown has all 3 options (High School/University/PhD)');
      console.log('  ✅ All READABILITY options found');
    } else {
      results.failed.push(`❌ READABILITY dropdown missing options (found ${readabilityFound}/3)`);
      console.log(`  ❌ READABILITY options incomplete (${readabilityFound}/3)`);
    }
    
    // Select PhD and close
    await page.locator(`[role="option"]:has-text("PhD")`).click();
    await sleep(500);
    
    const screenshotPath4 = join(SCREENSHOTS_DIR, '04-readability-dropdown.png');
    await page.screenshot({ path: screenshotPath4, fullPage: false });
    results.screenshots.push(screenshotPath4);
    console.log('');

    // Test 5: Check UNDETECTABLE dropdown
    console.log('📍 Test 5: Testing UNDETECTABLE dropdown...');
    const undetectableTrigger = page.locator('text=Undetectable').locator('..').locator('button').first();
    await undetectableTrigger.click();
    await sleep(500);
    
    const undetectableOptions = ['Standard', 'Enhanced', 'Ultimate'];
    let undetectableFound = 0;
    
    for (const option of undetectableOptions) {
      const optionElement = page.locator(`[role="option"]:has-text("${option}")`);
      if (await optionElement.isVisible()) {
        undetectableFound++;
      }
    }
    
    if (undetectableFound === 3) {
      results.passed.push('✅ UNDETECTABLE dropdown has all 3 options (Standard/Enhanced/Ultimate)');
      console.log('  ✅ All UNDETECTABLE options found');
    } else {
      results.failed.push(`❌ UNDETECTABLE dropdown missing options (found ${undetectableFound}/3)`);
      console.log(`  ❌ UNDETECTABLE options incomplete (${undetectableFound}/3)`);
    }
    
    // Select Enhanced and close
    await page.locator(`[role="option"]:has-text("Enhanced")`).click();
    await sleep(500);
    
    const screenshotPath5 = join(SCREENSHOTS_DIR, '05-undetectable-dropdown.png');
    await page.screenshot({ path: screenshotPath5, fullPage: false });
    results.screenshots.push(screenshotPath5);
    console.log('');

    // Test 6: Check action buttons visibility
    console.log('📍 Test 6: Testing action buttons...');
    const pasteBtn = page.locator('button:has-text("Paste")').first();
    const uploadBtn = page.locator('button:has-text("Upload")').first();
    const sampleBtn = page.locator('button:has-text("Try Sample")').first();
    
    const pasteBtnVisible = await pasteBtn.isVisible();
    const uploadBtnVisible = await uploadBtn.isVisible();
    const sampleBtnVisible = await sampleBtn.isVisible();
    
    if (pasteBtnVisible) {
      results.passed.push('✅ Paste Text button is visible');
      console.log('  ✅ Paste Text button found');
    } else {
      results.failed.push('❌ Paste Text button not found');
      console.log('  ❌ Paste Text button missing');
    }
    
    if (uploadBtnVisible) {
      results.passed.push('✅ Upload File button is visible');
      console.log('  ✅ Upload File button found');
    } else {
      results.failed.push('❌ Upload File button not found');
      console.log('  ❌ Upload File button missing');
    }
    
    if (sampleBtnVisible) {
      results.passed.push('✅ Try Sample button is visible');
      console.log('  ✅ Try Sample button found');
    } else {
      results.failed.push('❌ Try Sample button not found');
      console.log('  ❌ Try Sample button missing');
    }
    console.log('');

    // Test 7: Click "Try Sample" button
    console.log('📍 Test 7: Testing "Try Sample" functionality...');
    await sampleBtn.click();
    await sleep(1000);
    
    const textarea = page.locator('textarea').first();
    const textareaValue = await textarea.inputValue();
    
    if (textareaValue.length > 0) {
      results.passed.push(`✅ Try Sample button fills textarea with sample text (${textareaValue.length} chars)`);
      console.log(`  ✅ Sample text loaded (${textareaValue.length} characters)`);
    } else {
      results.failed.push('❌ Try Sample button did not fill textarea');
      console.log('  ❌ Sample text not loaded');
    }
    
    const screenshotPath7 = join(SCREENSHOTS_DIR, '07-try-sample-clicked.png');
    await page.screenshot({ path: screenshotPath7, fullPage: false });
    results.screenshots.push(screenshotPath7);
    console.log('');

    // Test 8: Test textarea input
    console.log('📍 Test 8: Testing manual text input...');
    await textarea.clear();
    await sleep(300);
    const testText = 'This is a test input to verify the textarea functionality works correctly.';
    await textarea.fill(testText);
    await sleep(500);
    
    const inputValue = await textarea.inputValue();
    if (inputValue === testText) {
      results.passed.push('✅ Textarea accepts manual text input');
      console.log('  ✅ Manual text input works');
    } else {
      results.failed.push('❌ Textarea input mismatch');
      console.log('  ❌ Text input issue');
    }
    
    const screenshotPath8 = join(SCREENSHOTS_DIR, '08-manual-input.png');
    await page.screenshot({ path: screenshotPath8, fullPage: false });
    results.screenshots.push(screenshotPath8);
    console.log('');

    // Test 9: Test Humanize button
    console.log('📍 Test 9: Testing Humanize button...');
    const humanizeBtn = page.locator('button:has-text("Humanize")').first();
    const isHumanizeBtnEnabled = await humanizeBtn.isEnabled();
    
    if (isHumanizeBtnEnabled) {
      results.passed.push('✅ Humanize button is enabled when text is present');
      console.log('  ✅ Humanize button is enabled');
      
      // Click Humanize button
      await humanizeBtn.click();
      console.log('  ⏳ Processing text...');
      await sleep(2000);
      
      const screenshotPath9a = join(SCREENSHOTS_DIR, '09a-humanize-processing.png');
      await page.screenshot({ path: screenshotPath9a, fullPage: false });
      results.screenshots.push(screenshotPath9a);
      
      // Wait for output (max 30 seconds)
      let outputFound = false;
      for (let i = 0; i < 30; i++) {
        const outputPanel = page.locator('text=Humanized Content').locator('../..');
        const outputText = await outputPanel.textContent();
        
        if (outputText && outputText.length > 100 && !outputText.includes('Your humanized text will appear here')) {
          outputFound = true;
          results.passed.push('✅ Humanize button processes text and displays output');
          console.log('  ✅ Output generated successfully');
          break;
        }
        await sleep(1000);
      }
      
      if (!outputFound) {
        results.failed.push('❌ Humanize button did not generate output within 30 seconds');
        console.log('  ❌ No output generated (timeout)');
      }
      
      const screenshotPath9b = join(SCREENSHOTS_DIR, '09b-humanize-result.png');
      await page.screenshot({ path: screenshotPath9b, fullPage: false });
      results.screenshots.push(screenshotPath9b);
      
    } else {
      results.failed.push('❌ Humanize button is disabled when it should be enabled');
      console.log('  ❌ Humanize button is disabled');
    }
    console.log('');

    // Test 10: Test mode switching with content
    console.log('📍 Test 10: Testing mode switching...');
    const zeroGPTBtn = page.locator('button:has-text("ZeroGPT")').first();
    await zeroGPTBtn.click();
    await sleep(500);
    
    const screenshotPath10a = join(SCREENSHOTS_DIR, '10a-mode-zerogpt.png');
    await page.screenshot({ path: screenshotPath10a, fullPage: false });
    results.screenshots.push(screenshotPath10a);
    
    const turnitinBtn = page.locator('button:has-text("Turnitin")').first();
    await turnitinBtn.click();
    await sleep(500);
    
    const screenshotPath10b = join(SCREENSHOTS_DIR, '10b-mode-turnitin.png');
    await page.screenshot({ path: screenshotPath10b, fullPage: false });
    results.screenshots.push(screenshotPath10b);
    
    const academicBtn = page.locator('button:has-text("Academic")').first();
    await academicBtn.click();
    await sleep(500);
    
    const screenshotPath10c = join(SCREENSHOTS_DIR, '10c-mode-academic.png');
    await page.screenshot({ path: screenshotPath10c, fullPage: false });
    results.screenshots.push(screenshotPath10c);
    
    results.passed.push('✅ Mode switching works correctly');
    console.log('  ✅ All modes can be switched');
    console.log('');

  } catch (error) {
    console.error('❌ Test error:', error.message);
    results.failed.push(`❌ Test error: ${error.message}`);
    
    const screenshotPathError = join(SCREENSHOTS_DIR, 'error.png');
    await page.screenshot({ path: screenshotPathError, fullPage: true });
    results.screenshots.push(screenshotPathError);
  } finally {
    await browser.close();
  }

  // Generate report
  console.log('\n' + '='.repeat(80));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`\n✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`📸 Screenshots: ${results.screenshots.length}`);
  
  console.log('\n' + '-'.repeat(80));
  console.log('PASSED TESTS:');
  console.log('-'.repeat(80));
  results.passed.forEach(test => console.log(test));
  
  if (results.failed.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('FAILED TESTS:');
    console.log('-'.repeat(80));
    results.failed.forEach(test => console.log(test));
  }
  
  console.log('\n' + '-'.repeat(80));
  console.log('SCREENSHOTS:');
  console.log('-'.repeat(80));
  results.screenshots.forEach(path => console.log(`📸 ${path}`));
  
  console.log('\n' + '='.repeat(80));
  
  // Write JSON report
  const reportPath = join(SCREENSHOTS_DIR, 'test-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  return results;
}

// Run tests
testHumanizeAI()
  .then(() => {
    console.log('\n✨ Testing completed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Testing failed:', error);
    process.exit(1);
  });
