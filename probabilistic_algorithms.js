
function randInt(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

/////////////////////////////////////////////////
////////////////////////////////////////////////
///////////////////////////////////////////////
// 1: Probabilistic Pi
function pi() {
	// Function to calculate pi by tossing darts
	// circle is unit circle, r=1 around (0,0)
	// rectangle is (-1,-1) to (1,1)
	function probabilisticPI(darts) {
		// Track # of darts that hit
		let hits = 0;

		for (let i = 0; i < darts; i++) {
			// Pick a point within (-1,-1) to (1,1)
			let x = -1 + (2 * Math.random());
			let y = -1 + (2 * Math.random());

			// See if it is inside circle
			let length = Math.sqrt(x * x + y * y);
			if (length <= 1) {
				// track hit if it does
				hits += 1;
			}
		}

		// calculate pi based on hit ratio and total area.
		let almostPi = 4 * (hits / darts);
		console.log(`Ratio: ${almostPi} @ ${darts.toLocaleString()} darts`);

	}

	// Do it with increasing numbers of darts
	probabilisticPI(parseInt("1,000".replace(/,/g, "")));
	probabilisticPI(parseInt("10,000".replace(/,/g, "")));
	probabilisticPI(parseInt("100,000".replace(/,/g, "")));
	probabilisticPI(parseInt("1,000,000".replace(/,/g, "")));
	probabilisticPI(parseInt("100,000,000".replace(/,/g, "")));
	// probabilisticPI(parseInt("1,000,000,000".replace(/,/g, "")));
}
pi();

/////////////////////////////////////////////////
////////////////////////////////////////////////
///////////////////////////////////////////////
// 2: Probabilistic Primes
function primes() {
	// Check if number P is a prime
	// by randomly selecting k values, from (1 < n < P)
	function probabilisticPrime(P, k) {
		// Ignore 0/1, they do not count as primes
		if (P === 0 || P === 1) { return false; }

		// loop k times...
		for (let i = 0; i < k; i++) {
			// pick value n from (1 < n < P)
			let n = randInt(2, P);


			// Could improve accuracy by not using 
			// numbers between (P/2 and P)
			// let n = randInt(2, P/2);

			// Check remainder
			let remainder = P % n;
			if (remainder === 0) {
				// if divisible, definitely not a prime.
				return false;
			}
		}
		return true;
	}

	// Gets all primes up to n
	function allPrimes(n) {
		// Track prime status of values
		let table = {};
		// List of primes
		let primes = [];
		// Starting at 2, up to n
		for (let i = 2; i < n; i++) {
			// See if value is unmarked in table
			if (table[i] === undefined) {
				// Unmarked values are primes
				table[i] = true;
				primes.push(i);

				// Mark all values that are multiples of it
				// as not prime.
				for (let k = i * 2; k < n; k += i) {
					table[k] = false;
				}
			}
		}
		// Return the list of primes that was built
		return primes;
	}
	const MAX_VALUE = 100000;
	const SQRT_MAX_VALUE = Math.floor(Math.sqrt(MAX_VALUE));
	let primesList = allPrimes(MAX_VALUE);


	// Check a single value with probabilisticPrime with some k-value
	function checkProbabilisticPrime(val, k) {
		// Default k-value of 10
		if (k === undefined) { k = 10; }

		// count number of correct guesses for accuracy
		let correct = 0;
		// See if the value is actually a prime
		// by checking the list of primes
		let actuallyAPrime = primesList.includes(val);
		for (let i = 0; i < 1000; i++) {
			// Guess at if the value is prime or not
			let probAPrime = probabilisticPrime(val, k);

			// And see if we got it right or wrong
			if (probAPrime === actuallyAPrime) {
				correct += 1;
			}
		}
		// Print score and k-value
		console.log(`Checking ${val}: actually prime?${actuallyAPrime}...Got ${correct} / 1000 Correct at k=${k} right!`);
	}

	// Makes a number divisible by some number, k
	// with x = x - x%k
	function makeNonPrime(max) {
		let x = randInt(0, max)
		let K = randInt(2, Math.sqrt(max));

		x = x - x % K;

		return x;
	}
	// Try the same set of tests, with different k-values
	// to see how the accuracy changes
	for (let k = 10; k <= 10000; k *= 10) {

		console.log("Some composite numbers");
		checkProbabilisticPrime(2 * 2 * 2 * 2 * 3 * 3 * 3, k);
		checkProbabilisticPrime(2 * 3 * 4 * 5 * 6, k);
		checkProbabilisticPrime(2 * 3 * 4 * 5 * 6 * 7, k);

		console.log("Some prime numbers");
		checkProbabilisticPrime(4637, k);
		checkProbabilisticPrime(1993, k);

		// Even numbers
		console.log("Multiples of 2");
		checkProbabilisticPrime(8, k);
		checkProbabilisticPrime(40, k);
		checkProbabilisticPrime(46, k);
		checkProbabilisticPrime(80, k);
		checkProbabilisticPrime(442, k);
		checkProbabilisticPrime(222, k);
		checkProbabilisticPrime(4444, k);
		checkProbabilisticPrime(44444, k);
		checkProbabilisticPrime(44448, k);
		// Numbers where the sum of the digits is divisible by 3. 
		console.log("Multiples of 3");
		// 4+4+4+3 = 15, 15%3 = 0
		checkProbabilisticPrime(33, k);
		checkProbabilisticPrime(36, k);
		checkProbabilisticPrime(66, k);
		checkProbabilisticPrime(99, k);
		checkProbabilisticPrime(123, k);
		checkProbabilisticPrime(156, k);
		checkProbabilisticPrime(231, k);
		checkProbabilisticPrime(423, k);
		checkProbabilisticPrime(4443, k);
		// 4+4+4+3+3 = 18, 18%3 = 0
		checkProbabilisticPrime(44433, k);
		// Numbers whose final digit is a 5 
		console.log("Multiples of 5");
		// (anything ending in '5' in decimal is obviously a multiple of 5)
		checkProbabilisticPrime(45, k);
		checkProbabilisticPrime(65, k);
		checkProbabilisticPrime(445, k);
		checkProbabilisticPrime(645, k);
		checkProbabilisticPrime(745, k);
		checkProbabilisticPrime(4445, k);
		checkProbabilisticPrime(44445, k);
		// Number constructed as the product of two positive integers.
		console.log("Composites constructed from products");
		checkProbabilisticPrime(37 * 53, k);
		for (let j = 0; j < 10; j++) {
			let val1 = Math.floor(Math.random() * SQRT_MAX_VALUE);
			let val2 = Math.floor(Math.random() * SQRT_MAX_VALUE);
			checkProbabilisticPrime(val1 * val2, k);
		}

		for (let j = 0; j < 10; j++) {
			let val3 = Math.floor(Math.random() * 100);
			let val4 = Math.floor(Math.random() * 100);
			checkProbabilisticPrime(val3 * val4, k);

		}


		// Randomly generated numbers X that are then adjusted as follows:
		// X = X - X%K <-- X will now be divisible by K. 
		console.log("Modified prime numbers");
		for (let j = 0; j < 5; j++) {
			checkProbabilisticPrime(makeNonPrime(100), k);
		}
		for (let j = 0; j < 5; j++) {
			checkProbabilisticPrime(makeNonPrime(1000), k);
		}
		for (let j = 0; j < 5; j++) {
			checkProbabilisticPrime(makeNonPrime(10000), k);
		}
		for (let j = 0; j < 5; j++) {

			checkProbabilisticPrime(makeNonPrime(100000), k);
		}
	}

}
primes();


/////////////////////////////////////////////////
////////////////////////////////////////////////
///////////////////////////////////////////////
// 3: Probabilistic search
function avgSearch() {
	let times = 100;
	let sumWrong = 0;
	let avgWrong = 0;
	let globalSumComparisons = 0;
	let globalAvgComparisons = 0;
	let runs = 10000;
	for (let i = 0; i < runs; i++) {
		search(times);
	}

	globalAvgComparisons = globalSumComparisons / runs;
	avgWrong = sumWrong / runs;

	console.log(`Search was wrong an average of ${avgWrong} times out of ${times}. With an average number of ${globalAvgComparisons} Comparisons. With a total of ${runs} runs.`);

	function search(times) {
		// Build a random array 
		let nums = []
		for (let i = 0; i < 1000; i++) {
			let num = randInt(0, 10000);
			nums.push(num);
		}

		let numIterations = 0;
		// Search an array for a target randomly
		function probabilisticSearch(arr, target) {
			numIterations = 0;
			// Make up to 5000 guesses as asked
			for (let i = 0; i < 5000; i++) {
				// Pick an index
				let ind = randInt(0, arr.length);
				numIterations++;
				// See if target value is there
				if (arr[ind] === target) {
					// yay
					return true;
				}
			}
			// if we miss every time,
			// say it's not there 
			return false;
		}

		// Count times we get it wrong

		let wrong = 0;
		let sumComparisons = 0;
		for (let i = 0; i < times; i++) {
			// Find a value that is in the array
			// pick an index and get the value...
			let ind = randInt(0, nums.length);
			let val = nums[ind];

			// And try searching for that value
			let probSearch = probabilisticSearch(nums, val);
			sumComparisons += numIterations;
			if (!probSearch) {
				wrong += 1;
			}
		}
		let averageComparisons = sumComparisons / times;
		// console.log(`Search was wrong ${wrong} times out of ${times}. With an average number of ${averageComparisons} Comparisons`);

		globalSumComparisons += averageComparisons;
		sumWrong += wrong;
	}
}
avgSearch();

/////////////////////////////////////////////////
////////////////////////////////////////////////
///////////////////////////////////////////////
// 4: MonteCarlo Integration
function monteCarloIntegration() {
	// Rect for dart throwing integration
	let unitRect = { left: -1, right: 1, top: 1, bottom: -1 };

	// Integrate by throwing darts at a rectangular area
	// and seeing if it is within the given function or not
	function dartThrow(f, darts, rect) {
		// Track hits
		let hits = 0;
		// Precalculate range of rectangle
		let w = rect.right - rect.left;
		let h = rect.top - rect.bottom;
		let a = w * h;

		for (let i = 0; i < darts; i++) {
			// Pick a random spot in the rectangle
			let x = rect.left + w * Math.random();
			let y = rect.bottom + h * Math.random();

			// Y point of function at x
			let val = f(x);

			// Positive hits, below curve and above x-axis
			if (y > 0 && val > y) {
				hits += 1;
			}
			// Negative hits, above curve, below x-axis
			if (y < 0 && val < y) {
				hits -= 1;
			}
		}
		// Multiply hit ratio by rectangle area.
		return a * hits / darts;
	}

	// Integrate by picking random points in a range
	// and getting average/mean value
	// then multiplying by the width of the range
	function randomMean(f, n, left, right) {
		// Start at 0
		let sum = 0;
		// Width of range
		let w = right - left;

		for (let i = 0; i < n; i++) {
			// Pick a spot
			let x = left + (w) * Math.random();
			// evaluate function at spot
			let val = f(x);

			// Add to sum
			sum += val;
		}

		// Get average
		let mean = sum / n;
		// And calculate result
		return w * mean;
	}

	// More canon mathematical integration
	// Sum areas of a bunch of trapezoids along a function
	function trapezoidal(f, n, left, right) {
		let sum = 0;
		// Width of region
		let w = right - left;
		// height of one trapezoid
		let dx = w / n;
		// Left edge of trapezoid
		let x1 = left;
		// length of left edge
		let y1 = f(x1);
		for (let i = 0; i < n; i++) {
			// Right edge of trapezoid
			let x2 = x1 + dx;
			// length of right edge
			let y2 = f(x2);

			// Trapezoid area is 
			// h * (b1+b2) / 2
			// dx is our height
			// y1 and y2 are our edges
			// and this cancels out negative area perfectly
			let a = dx * (y1 + y2) / 2;
			// add area to sum
			sum += a;

			// Make right edge of this trap the left edge of the next trap
			x1 = x2;
			y1 = y2;
		}
		// Just return sum....
		return sum;
	}


	function yequalsx(x) {
		return x;
	}

	// Function that generates a linear function
	function linear(m, b) {
		// Returns a function that takes x,
		// and evaluates y = mx + b for that x
		// or f(x) = mx + b
		return function (x) {
			return m * x + b;
		}
	}

	// Same idea for functions of order 2
	function square(a, b, c) {
		return function (x) {
			return a * x * x + b * x + c;
		}
	}

	// Same idea for functions of order 3
	function square(a, b, c, d) {
		return function (x) {
			return a * x * x * x + b * x * x + c * x + d;
		}
	}

	// Same idea for sin...
	function sin(amp, freq) {
		return function (x) {
			return amp * Math.sin(x * freq);
		}
	}

	function check(f, name, n, area) {
		let left = area.left;
		let right = area.right;

		let startDarts = new Date().getTime();
		let dartResult = dartThrow(f, n, area);
		let endDarts = new Date().getTime();
		let dartTime = endDarts - startDarts;

		let startMean = new Date().getTime();
		let meanResult = randomMean(f, n, left, right);
		let endMean = new Date().getTime();
		let meanTime = endMean - startMean;

		let startTrap = new Date().getTime();
		let trapResult = trapezoidal(f, n, left, right);
		let endTrap = new Date().getTime();
		let trapTime = endTrap - startTrap;

		console.log(`${name} inside ${JSON.stringify(area)}: Results:`
			+ `\nDarts: ${dartTime}ms to get result: ${dartResult}`
			+ `\nMeans: ${meanTime}ms to get result: ${meanResult}`
			+ `\nTraps: ${trapTime}ms to get result: ${trapResult}`);

	}

	let MAX_DARTS = 10000000;

	console.log("\n\nf(x)=x in (-1, 1)");
	for (let darts = 10; darts <= MAX_DARTS; darts *= 10) {
		check(yequalsx, "f(x) = x", darts, unitRect)
	}

	console.log("\n\nf(x)=x in (0, 1)");
	let rect2 = { left: 0, right: 1, top: 1, bottom: 0 };
	for (let darts = 10; darts <= MAX_DARTS; darts *= 10) {
		check(yequalsx, "f(x) = x", darts, rect2)
	}
	console.log("\n\nf(x)=sin(2x/PI) in (-1, 1)");
	for (let darts = 10; darts <= MAX_DARTS; darts *= 10) {
		check(sin(1, 2 / Math.PI), "f(x) = sin(2x/PI)", darts, unitRect)
	}
	console.log("\n\nf(x)=sin(2x/PI) in (0, 1)");
	for (let darts = 10; darts <= MAX_DARTS; darts *= 10) {
		check(sin(1, 2 / Math.PI), "f(x) = sin(2x/PI)", darts, rect2)
	}
	// Experiment for calculating pi/2
	/*
	let pi = Math.PI;
	// let rectPi = {left: 0, right: Math.PI, bottom:0, top: 1};
	a = dartThrow(sin(1, pi), 1000000, rect2);
	console.log(`with darts, area of y = sin(x*PI) inside ${JSON.stringify(rect2)}: ` + a);
	a = randomMean(sin(1, pi), 1000000, 0, 1);
	console.log(`with random mean, area of y = sin(x*PI) from (0, 1): ` + a);
	a = trapizoidal(sin(1, pi), 1000, 0, 1);
	console.log(`with trapizoidal, area of y = sin(x*PI) from (0, 1): ` + a);
	//*/


}
monteCarloIntegration();