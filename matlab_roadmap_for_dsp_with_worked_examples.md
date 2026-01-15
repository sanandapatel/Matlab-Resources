# MATLAB — Complete Beginner to DSP Learning Resource (Fully Explained)

This document is a **from-scratch, no-assumptions MATLAB learning resource**, designed to take you from **absolute basics** (variables, loops, plotting) to **practical DSP and serial/UART data processing**. Every concept includes **why it exists, how it works, and how it is used in real engineering problems**.

This can be treated as:
- A **self-study textbook**
- A **lab companion**
- A **DSP + MATLAB reference**

---

## PART 1: MATLAB BASICS (ABSOLUTE BEGINNER)

---

## 1. MATLAB Environment

MATLAB is an **interactive numerical computing environment**. Unlike C/C++, you can execute code line-by-line and immediately see results.

### Clearing the Environment

```matlab
clc; clear; close all;
```

**Explanation:**
- `clc` clears the Command Window so output is readable.
- `clear` removes all variables from memory to avoid accidental reuse.
- `close all` closes all figure windows from previous runs.

This is considered **best practice** at the start of every script.

---

## 2. Variables and Data Types

### Creating Variables

```matlab
a = 10;
b = 3.14;
c = true;
d = 'MATLAB';
```

**Explanation:**
- MATLAB automatically assigns data types.
- Numeric values are stored as **double precision floating point** by default.
- `logical` is used for conditions and masking.
- Character arrays store text.

### Checking Data Type

```matlab
class(a)
```

---

## 3. Numeric Data Types (Important for DSP)

```matlab
x1 = double(12.5);
x2 = single(12.5);
x3 = int16(1024);
```

**Explanation:**
- `double`: High precision (default for DSP)
- `single`: Reduced memory usage
- `int16`, `uint16`: Useful when emulating ADC data

---

## 4. Vectors and Matrices (Core of MATLAB)

### Creating Vectors

```matlab
x = [1 2 3 4];       % Row vector
y = [1; 2; 3; 4];   % Column vector
```

**Explanation:**
- DSP signals are represented as **vectors**.
- Many MATLAB DSP functions expect **column vectors**.

### Indexing

```matlab
x(1)        % First element
x(2:4)      % Elements 2 to 4
```

---

## 5. Generating Ranges and Time Axes

```matlab
n = 0:10;                 % Discrete-time index
t = 0:0.001:1;           % Time axis
```

**Explanation:**
- `:` operator generates evenly spaced samples.
- Time and sample indices are fundamental in DSP.

---

## 6. Basic Plotting (Very Important)

### Continuous-Time Style Plot

```matlab
x = sin(2*pi*5*t);
plot(t, x);
xlabel('Time (s)'); ylabel('Amplitude'); grid on;
```

**Explanation:**
- `plot` connects samples (used for analog-like signals).
- Labels and grid improve readability and reports.

### Discrete-Time Plot

```matlab
n = 0:20;
x = sin(0.2*pi*n);
stem(n, x);
```

**Explanation:**
- `stem` is used for discrete-time signals in DSP.

---

## 7. Operators

```matlab
x = [1 2 3];
y = [4 5 6];

z1 = x + y;      % Vector addition
z2 = x .* y;     % Element-wise multiplication
z3 = x * y';     % Dot product
```

**Explanation:**
- Element-wise operators (`.*`, `./`) are heavily used in DSP.
- Matrix multiplication is used for correlations and transforms.

---

## 8. Conditional Statements (if–else)

```matlab
x = -5;
if x > 0
    disp('Positive');
elseif x == 0
    disp('Zero');
else
    disp('Negative');
end
```

**Explanation:**
- Used for decision making, thresholding, and signal classification.

---

## 9. Loops (for / while)

### For Loop

```matlab
y = zeros(1,10);
for n = 2:10
    y(n) = y(n-1) + 1;
end
```

**Explanation:**
- Loops execute code repeatedly.
- Used for difference equations and simulations.

### While Loop

```matlab
n = 1;
while n <= 5
    disp(n);
    n = n + 1;
end
```

---

## PART 2: FUNCTIONS AND MODULAR PROGRAMMING

---

## 10. Creating a Function

```matlab
function y = scale_signal(x, a)
    y = a * x;
end
```

**Explanation:**
- Functions make code reusable.
- Inputs: signal `x`, gain `a`
- Output: scaled signal `y`

### Calling the Function

```matlab
n = 0:10;
x = sin(0.2*pi*n);
y = scale_signal(x, 2);
```

---

## PART 3: FILE HANDLING

---

## 11. Reading and Writing Files

### Reading CSV Data

```matlab
data = readmatrix('signal.csv');
```

**Explanation:**
- Used for sensor, ADC, and experiment data.
- Data is loaded as a numeric matrix.

### Saving Data

```matlab
save('processed.mat', 'data');
```

---

## PART 4: UART / SERIAL COMMUNICATION

---

## 12. UART Serial Communication (Very Important)

### Opening Serial Port

```matlab
s = serialport('COM16', 460800);
configureTerminator(s, "LF");
flush(s);
```

**Explanation:**
- Connects MATLAB to a microcontroller via UART.
- Baud rate must match MCU firmware.
- Line-feed terminator marks end of data.

### Reading Data

```matlab
line = readline(s);
value = str2double(line);
```

**Explanation:**
- Reads ASCII data sent by MCU.
- Converts string to numeric value.

### Real-Time Plotting

```matlab
plot(value, 'o'); drawnow;
```

---

## PART 5: SIGNALS AND DSP FOUNDATIONS

---

## 13. Discrete-Time Signals

```matlab
n = -10:10;
x = double(n >= 0);
stem(n, x);
```

**Explanation:**
- Models unit step signal.
- Used in system analysis.

---

## 14. Convolution

```matlab
x = [1 2 3];
h = [1 1];
y = conv(x, h);
```

**Explanation:**
- Models LTI system response.
- Fundamental DSP operation.

---

## 15. FFT and Frequency Analysis

```matlab
Fs = 1000;
t = 0:1/Fs:1-1/Fs;
x = sin(2*pi*50*t);

X = fft(x);
f = (0:length(X)-1)*Fs/length(X);
plot(f, abs(X));
```

**Explanation:**
- Converts signal to frequency domain.
- Reveals spectral content.

---

## 16. Digital Filters

```matlab
[b,a] = butter(4, 0.2);
y = filter(b,a,x);
```

**Explanation:**
- Butterworth IIR low-pass filter.
- Used for noise reduction.

---

## FINAL NOTES

- MATLAB is both a **programming language and DSP lab**
- Always visualize signals
- Match theory with simulation
- This document is sufficient for **academic, lab, and project-level DSP work**

