import { chromium } from 'playwright';

async function testPerformance(url, name) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log(`Testing ${name}: ${url}`);
  
  const startTime = Date.now();
  await page.goto(url, { waitUntil: 'networkidle' });
  const loadTime = Date.now() - startTime;
  
  // Get performance metrics
  const metrics = await page.evaluate(() => ({
    FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
    LCP: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0,
    CLS: 0, // Would need more complex measurement
    FID: 0, // Would need interaction measurement
    TTFB: performance.timing.responseStart - performance.timing.navigationStart,
    domComplete: performance.timing.domComplete - performance.timing.navigationStart,
    loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart
  }));

  // Check for React hydration
  const hasReact = await page.evaluate(() => !!window.React);
  const hasNext = await page.evaluate(() => !!window.__NEXT_DATA__);
  
  console.log(`${name} Results:`);
  console.log(`  Load Time: ${loadTime}ms`);
  console.log(`  First Contentful Paint: ${metrics.FCP.toFixed(2)}ms`);
  console.log(`  Time to First Byte: ${metrics.TTFB}ms`);
  console.log(`  DOM Complete: ${metrics.domComplete}ms`);
  console.log(`  Has React: ${hasReact}`);
  console.log(`  Has Next.js: ${hasNext}`);
  console.log('---');
  
  await browser.close();
  return { name, loadTime, metrics, hasReact, hasNext };
}

async function runTests() {
  try {
    // Test React/Vite version
    const reactResults = await testPerformance('http://localhost:5000', 'React/Vite');
    
    // Test Next.js version if available
    let nextResults = null;
    try {
      nextResults = await testPerformance('http://localhost:3000', 'Next.js');
    } catch (e) {
      console.log('Next.js not available on port 3000');
    }
    
    // Summary
    console.log('\n=== PERFORMANCE COMPARISON ===');
    console.log(`React/Vite Load Time: ${reactResults.loadTime}ms`);
    if (nextResults) {
      console.log(`Next.js Load Time: ${nextResults.loadTime}ms`);
      const improvement = ((reactResults.loadTime - nextResults.loadTime) / reactResults.loadTime * 100).toFixed(1);
      console.log(`Performance Improvement: ${improvement}%`);
    }
    
  } catch (error) {
    console.error('Test error:', error.message);
  }
}

runTests();