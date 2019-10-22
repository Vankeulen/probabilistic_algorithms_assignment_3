function randInt(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

/////////////////////////////////////////////////
////////////////////////////////////////////////
///////////////////////////////////////////////
// 1: Probalistic Pi
function pi() {
	// Function to calculate pi by tossing darts
	// circle is unit circle, r=1 around (0,0)
	// rectangle is (-1,-1) to (1,1)
	function probalisticPI(darts) {
		// Track # of darts that hit
		let hits = 0;

		for (let i = 0; i < darts; i++) {
			// Pick a point within (-1,-1) to (1,1)
			let x = -1 + (2 * Math.random())
			let y = -1 + (2 * Math.random())

			// See if it is inside circle
			let length = Math.sqrt(x * x + y * y);
			if (length <= 1) {
				// track hit if it does
				hits += 1;
			}
		}

		// calculate pi based on hit ratio and total area.
		let almostPi = 4 * (hits / darts);
		console.log(`Ratio: ${almostPi} @ ${darts.toLocaleString()} darts`)

	}

	// Do it with increasing numbers of darts
	probalisticPI(1000);
	/*
	probalisticPI(10000);
	probalisticPI(100000);
	probalisticPI(1000000);
	probalisticPI(10000000);
	//*/
	probalisticPI(100000000);
}
// pi();

/////////////////////////////////////////////////
////////////////////////////////////////////////
///////////////////////////////////////////////
// 2: Probalistic Primes
function primes() {
	// Check if number P is a prime
	// by randomly selecting k values, from (1 < n < P)
	function probalisticPrime(P, k) {
		// Ignore 0/1, they do not count as primes
		if (P === 0 || P === 1) { return false; }

		// loop k times...
		for (let i = 0; i < k; i++) {
			// pick value n from (1 < n < P)
			let n = randInt(2, P);
			if (n === 0 || n === 1) {
				n = 2;
			}

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
	let primesUpTo10000 = allPrimes(100000);


	// Check a single value with probalisticPrime with some k-value
	function checkProbalisticPrime(val, k) {
		// Default k-value of 10
		if (k === undefined) { k = 10; }

		// count number of correct guesses for accuracy
		let correct = 0;
		// See if the value is actually a prime
		// by checking the list of primes
		let actuallyAPrime = primesUpTo10000.includes(val);
		for (let i = 0; i < 1000; i++) {
			// Guess at if the value is prime or not
			let probAPrime = probalisticPrime(val, k);

			// And see if we got it right or wrong
			if (probAPrime === actuallyAPrime) {
				correct += 1;
			}
		}
		// Print score and k-value
		console.log(`Checking ${val}: actually prime?${actuallyAPrime}...Got ${val}  ${correct} / 1000 at k=${k} right!`);
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

		// Some composite numbers
		checkProbalisticPrime(2 * 2 * 2 * 2 * 3 * 3 * 3, k);
		checkProbalisticPrime(2 * 3 * 4 * 5 * 6, k);
		checkProbalisticPrime(2 * 3 * 4 * 5 * 6 * 7, k);

		// Some prime numbers
		checkProbalisticPrime(4637, k);
		checkProbalisticPrime(1993, k);

		// Multiples of 2
		checkProbalisticPrime(4444, k);
		checkProbalisticPrime(44444, k);
		// Multiples of 3
		// 4+4+4+3 = 15, 15%3 = 0
		checkProbalisticPrime(4443, k);
		// 4+4+4+3+3 = 18, 18%3 = 0
		checkProbalisticPrime(44433, k);
		// Multiples of 5 
		// (anything ending in '5' in decimal is obviously a multiple of 5)
		checkProbalisticPrime(4445, k);
		checkProbalisticPrime(44445, k);

		// Composites constructed from products
		checkProbalisticPrime(37 * 53, k);


		// Randomly generated non-prime numbers using 
		// x = x - x%k
		for (let j = 0; j < 5; j++) {
			checkProbalisticPrime(makeNonPrime(100000), k);
		}
	}

}
// primes();


/////////////////////////////////////////////////
////////////////////////////////////////////////
///////////////////////////////////////////////
// 3: Probalistic search
function search() {
	// Build a random array 
	let nums = []
	for (let i = 0; i < 1000; i++) {
		let num = randInt(0, 10000);
		nums.push(num);
	}

	// Search an array for a target randomly
	function probalisticSearch(arr, target) {
		// Make up to 5000 guesses as asked
		for (let i = 0; i < 5000; i++) {
			// Pick an index
			let ind = randInt(0, arr.length);
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
	for (let i = 0; i < times; i++) {
		// Find a value that is in the array
		// pick an index and get the value...
		let ind = randInt(0, nums.length);
		let val = nums[ind]

		// And try searching for that value
		if (!probalisticSearch(nums, val)) {
			wrong += 1;
		}
	}

	console.log(`Search was wrong ${wrong} times out of ${times}`);


}
// search();


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
	function trapizoidal(f, n, left, right) {
		let sum = 0;
		// Width of region
		let w = right - left;
		// height of one trapezoid
		let dx = w / n;
		for (let i = 0; i < n; i++) {
			// Left edge of trapezoid
			let x1 = left + dx * i;
			// Right edge of trapezoid
			let x2 = x1 + dx;
			// length of left edge
			let y1 = f(x1);
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


	// Do same integration for some regions and functions...
	let a = dartThrow(yequalsx, 1000000, unitRect);
	console.log(`with darts, area of y = x inside ${JSON.stringify(unitRect)}: ` + a);
	a = randomMean(yequalsx, 1000000, -1, 1);
	console.log(`with random mean, area of y = x from (-1, 1): ` + a);
	a = trapizoidal(yequalsx, 1000, -1, 1);
	console.log(`with trapizoidal, area of y = x from (-1, 1): ` + a);

	let rect2 = { left: 0, right: 1, top: 1, bottom: 0 };
	a = dartThrow(yequalsx, 1000000, rect2);
	console.log(`with darts, area of y = x inside ${JSON.stringify(rect2)}: ` + a);
	a = randomMean(yequalsx, 1000000, 0, 1);
	console.log(`with random mean, area of y = x from (0, 1): ` + a);
	a = trapizoidal(yequalsx, 1000, 0, 1);
	console.log(`with trapizoidal, area of y = x from (0, 1): ` + a);

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
// monteCarloIntegration();