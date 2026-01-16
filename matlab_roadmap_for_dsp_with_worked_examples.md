# Complete MATLAB Digital Signal Processing Learning Resource
## From Absolute Basics to Filter Design and Spectral Analysis

---

## PART 1: MATLAB FUNDAMENTALS

### 1.1 Understanding the MATLAB Environment

When you open MATLAB, you'll see four main areas:

**Command Window (Bottom Left)**: This is where MATLAB executes your commands immediately. You type a command and press Enter—MATLAB processes it and shows the result. This is perfect for quick calculations and testing individual lines of code.

**Editor (Center)**: This is where you write scripts (files with `.m` extension). Unlike the Command Window, a script allows you to write multiple lines of code, save them, and run them all at once. This is your primary workspace for DSP projects.

**Workspace (Top Right)**: This panel shows all variables currently in memory. Each variable has a name, size (dimensions), and data type. As you run code, variables appear here. You can inspect any variable by double-clicking it.

**Current Folder (Left Side)**: Shows the file structure. MATLAB can only access files in the current folder without explicitly changing the path. Always organize your DSP projects in a dedicated folder.

### 1.2 Scripts vs Functions vs Live Scripts

**Scripts (.m files)**
A script is a plain text file containing MATLAB commands that execute sequentially. Scripts have no input/output specification—they use variables in the workspace directly.

```matlab
% Script: basic_sine_wave.m
% This script generates and plots a simple sine wave

fs = 8000;           % Sampling frequency in Hz
t = 0:1/fs:1;        % Time vector: 0 to 1 second, sampled at fs
f = 440;             % Frequency of sine wave (A4 note)
x = sin(2*pi*f*t);   % Generate sine wave

plot(t, x);
xlabel('Time (s)');
ylabel('Amplitude');
title('440 Hz Sine Wave');
grid on;
```

**Explanation**: `fs` defines how many samples per second (8000 samples/sec). The colon operator `0:1/fs:1` creates a time vector starting at 0, incrementing by 1/8000, ending at 1 second. `sin(2*pi*f*t)` computes the sine wave mathematically. The multiplication operator `*` here performs scalar multiplication across the entire vector.

**Functions (.m files with function declaration)**
A function is a reusable block of code with inputs and outputs. Functions are essential for DSP because you'll apply the same operation repeatedly.

```matlab
% Function: generate_sine_wave.m
function [x, t] = generate_sine_wave(fs, duration, frequency)
    % Function: generate_sine_wave
    % Input:  fs (sampling frequency), duration (seconds), frequency (Hz)
    % Output: x (signal samples), t (time vector)
    
    t = 0:1/fs:duration-1/fs;  % Time vector from 0 to duration-1/fs
    x = sin(2*pi*frequency*t);  % Compute sine wave samples
end
```

**How to use this function**:
```matlab
% In a script or Command Window
[signal, time_vector] = generate_sine_wave(8000, 2, 440);
% signal contains 16000 samples (8000 samples/sec × 2 seconds)
% time_vector contains the corresponding time values
```

**Explanation**: The function declaration `function [x, t] = generate_sine_wave(fs, duration, frequency)` tells MATLAB this function produces two outputs (`x, t`) and takes three inputs. Inside, we compute the time vector and signal. When you call the function, MATLAB returns these values.

**Live Scripts (.mlx files)**
Live Scripts combine code, output, and formatted text in one interactive document. Perfect for learning because you see results immediately. However, for professional DSP work, regular scripts are more common.

### 1.3 Essential Startup Commands

Every MATLAB session should start with these cleanup commands:

```matlab
clear all;   % Delete all variables from workspace
clc;         % Clear the Command Window (removes previous output)
close all;   % Close all figure windows
```

**Explanation**: `clear all` ensures you start with a clean workspace—no leftover variables from previous sessions. `clc` clears the screen for readability. `close all` closes all plots. These prevent subtle bugs where old data interferes with new calculations.

### 1.4 Variables and Data Types

MATLAB is dynamically typed—you don't declare types; MATLAB infers them from assignment.

**Numeric Data Types**

```matlab
clear all; clc;

% Double (64-bit floating point) — default for most DSP work
voltage = 3.3;           % Single value (scalar)
signal = [1.2, 3.4, 5.6]; % Vector of doubles
matrix = [1 2 3; 4 5 6]; % Matrix of doubles

% Check data type and memory
whos voltage signal matrix
% Output shows: voltage is 1×1 double (8 bytes)
%              signal is 1×3 double (24 bytes)
%              matrix is 2×3 double (48 bytes)

% Single (32-bit floating point) — uses half the memory
signal_single = single([1.2, 3.4, 5.6]); % Explicit conversion

% Integer types (useful for counters, indices, low-power DSP)
counter = int32(0);      % 32-bit signed integer (-2.1 billion to +2.1 billion)
byte_value = uint8(255); % 8-bit unsigned (0 to 255)
```

**Explanation**: By default, MATLAB uses `double` (8 bytes per number), which offers high precision but uses more memory. For embedded DSP (like your RF work), you'd use `single` to match 32-bit microcontroller arithmetic. `int32` and `uint8` are for counters or when working with microcontroller data that's stored as integers.

**Logical Data Type (Boolean)**

```matlab
% Logical: True (1) or False (0)
is_signal_valid = true;
is_frequency_high = false;
comparison_result = (5 > 3);  % Evaluates to true (1)

% Use in conditions
if is_signal_valid
    disp('Signal is valid');  % disp prints text to Command Window
end
```

**Explanation**: Logical values are used in conditional statements. The comparison `(5 > 3)` returns 1 (true) because it's mathematically correct.

### 1.5 Vectors and Matrices: The Heart of MATLAB

MATLAB was built for matrix operations. Every signal in DSP is a vector (a sequence of samples).

**Creating Vectors**

```matlab
% Row vector (1×N matrix): samples arranged horizontally
row_signal = [1, 2, 3, 4, 5];  % Or: [1 2 3 4 5]

% Column vector (N×1 matrix): samples arranged vertically
column_signal = [1; 2; 3; 4; 5];

% Transpose operator (') converts row to column or vice versa
column_from_row = row_signal';

% Colon operator: start:step:end
time_vector = 0:0.1:1;     % 0, 0.1, 0.2, ..., 1.0 (11 elements)
fs = 8000;                  % Sampling frequency
duration = 1;               % 1 second
t = 0:1/fs:duration-1/fs;  % Standard time vector for 1 second at 8 kHz

% linspace: linearly spaced vector (you specify number of points, not step)
freq_axis = linspace(0, 4000, 1000); % 1000 points from 0 to 4000 Hz
phase_angles = linspace(0, 2*pi, 100); % 100 points from 0 to 2π

% logspace: logarithmically spaced (useful for frequency plots)
log_freq = logspace(0, 5, 100); % 100 points from 10^0 to 10^5 Hz (1 to 100 kHz)
```

**Explanation**: The colon operator `start:step:end` is fundamental in DSP. For a 1-second signal at 8 kHz, you need 8000 samples, so `0:1/fs:duration-1/fs` creates exactly that. `linspace` is easier when you know the number of points but not the step size. `logspace` creates points on a logarithmic scale, useful for frequency responses that span many decades.

**Indexing and Slicing Vectors**

```matlab
signal = [10, 20, 30, 40, 50, 60];

% Single element (MATLAB uses 1-based indexing, not 0-like Python)
first_sample = signal(1);   % 10
third_sample = signal(3);   % 30
last_sample = signal(end);  % 60

% Range of elements
first_three = signal(1:3);         % [10, 20, 30]
last_two = signal(end-1:end);      % [50, 60]
every_other = signal(1:2:end);     % [10, 30, 50] — step size is 2

% Conditional indexing (returns samples matching a condition)
large_samples = signal(signal > 25);  % [30, 40, 50, 60]
```

**Explanation**: MATLAB indexing starts at 1 (not 0). The `end` keyword gives the last index. The range `1:3` means indices 1, 2, and 3. The step in `1:2:end` means every 2nd element. Conditional indexing `signal(signal > 25)` returns only samples greater than 25—essential for signal processing.

**Matrix Operations**

```matlab
clear all; clc;

A = [1, 2; 3, 4];   % 2×2 matrix
B = [5, 6; 7, 8];   % 2×2 matrix
v = [1; 2];         % 2×1 column vector

% Matrix multiplication (standard algebra)
C = A * B;          % Matrix product: (2×2) × (2×2) = (2×2)
result = A * v;     % Matrix-vector product: (2×2) × (2×1) = (2×1)

% Element-wise multiplication (each element of A times corresponding element of B)
element_wise = A .* B;  % Note the dot before *

% For vectors, * performs dot product (scalar result)
v1 = [1, 2, 3];
v2 = [4, 5, 6];
dot_product = v1 * v2';  % [1 2 3] × [4; 5; 6] = 1×4 + 2×5 + 3×6 = 32

% Dimensions of a matrix
size_matrix = size(A);   % Returns [2, 2]
num_rows = size(A, 1);   % Returns 2
num_cols = size(A, 2);   % Returns 2
length_vector = length(v); % Returns 2 (works for vectors)
```

**Explanation**: This is critical for DSP. Matrix multiplication `A * B` follows linear algebra rules. Element-wise operations use the dot operator (`.* ./ .^`). For convolution and filtering, you'll use matrix operations constantly. A 1×N row vector times an N×1 column vector gives a scalar (dot product), which is exactly how you compute filtered outputs.

### 1.6 Operators: Standard vs Element-Wise

One of the most common beginner mistakes is confusing `*` with `.*`.

```matlab
clear all; clc;

% Scalar multiplication (both do the same thing)
x = [1, 2, 3];
y1 = 2 * x;      % [2, 4, 6] — scalar times vector
y2 = x .* 2;     % [2, 4, 6] — same result (order doesn't matter)

% Vector multiplication: matrix operation vs element-wise
a = [1, 2, 3];
b = [4, 5, 6];

% a * b' is matrix multiplication (results in scalar—dot product)
result1 = a * b';  % 1×3 × 3×1 = scalar = 32

% a .* b is element-wise multiplication (results in vector)
result2 = a .* b;  % [1×4, 2×5, 3×6] = [4, 10, 18]

% Division operations
dividend = [10, 20, 30];

result3 = dividend / 2;      % [5, 10, 15] — scalar division
result4 = dividend ./ 2;     % [5, 10, 15] — element-wise (same for scalars)

% Element-wise power
x = [1, 2, 3];
y1 = x .^ 2;     % [1, 4, 9] — each element squared
y2 = x ^ 2;      % ERROR for non-square vectors; only for square matrices

% These operations are essential in DSP when processing signals
frequency = [100, 200, 300];  % Hz
magnitude = [0.5, 0.3, 0.1];
power = magnitude .^ 2;       % Power in each frequency bin
```

**Explanation**: The dot (`.`) in `.*, ./, .^` means "element-wise." Without it, MATLAB tries to interpret as a matrix operation, which fails for non-square dimensions. In DSP, you almost always use element-wise operations on signal vectors.

### 1.7 Control Flow: if–elseif–else

Conditional logic is essential for signal validation and branching in your DSP code.

```matlab
clear all; clc;

% Simple if-else
signal_level = 2.5;

if signal_level > 3.0
    disp('Signal is high');
elseif signal_level > 1.0
    disp('Signal is medium');
else
    disp('Signal is low');
end

% Multiple conditions (AND: &&, OR: ||, NOT: ~)
fs = 8000;           % Sampling frequency
signal_duration = 2; % Seconds

if fs >= 8000 && signal_duration <= 10
    disp('Sampling rate is adequate for this duration');
end

% Practical DSP example: validate signal before processing
max_amplitude = max(abs([0.5, -1.2, 0.8, 1.5])); % Find peak

if max_amplitude > 1.0
    warning('Signal clipping detected!');
    normalized_signal = [0.5, -1.2, 0.8, 1.5] / max_amplitude;
else
    normalized_signal = [0.5, -1.2, 0.8, 1.5];
end
```

**Explanation**: The `if` block executes if the condition is true. Use `&&` (AND) for multiple conditions that must all be true, `||` (OR) if any condition must be true. The `~` operator means NOT. In DSP, you frequently check if a signal is within expected bounds before filtering.

### 1.8 Loops: for and while

Loops automate repetitive calculations—essential when processing long signals or designing filters.

**for Loop: When You Know the Number of Iterations**

```matlab
clear all; clc;

% Generate 5 sine waves at different frequencies
fs = 1000;           % 1 kHz sampling
t = 0:1/fs:1;        % 1 second of samples
frequencies = [100, 200, 300, 400, 500];  % Hz

signals = [];        % Initialize empty array

for idx = 1:length(frequencies)
    f = frequencies(idx);
    signal = sin(2*pi*f*t);
    signals = [signals; signal];  % Append signal as new row
end

% signals is now a 5×1000 matrix: 5 signals, 1000 samples each
disp(['Generated ', num2str(size(signals, 1)), ' signals']);
```

**Explanation**: `for idx = 1:5` loops 5 times with `idx` taking values 1, 2, 3, 4, 5. Inside the loop, `frequencies(idx)` accesses the idx-th frequency. We build the `signals` matrix by appending rows. In professional code, you'd pre-allocate the matrix instead:

```matlab
% More efficient pre-allocation
signals = zeros(length(frequencies), length(t));  % Pre-allocate

for idx = 1:length(frequencies)
    f = frequencies(idx);
    signals(idx, :) = sin(2*pi*f*t);  % Fill the idx-th row
end
```

**Explanation**: Pre-allocation is faster because MATLAB doesn't have to resize the array each iteration. `zeros(5, 1000)` creates a 5×1000 matrix of zeros. We then fill each row `signals(idx, :)` with the sine wave.

**while Loop: When You Don't Know When to Stop**

```matlab
clear all; clc;

% Detect signal level until it drops below threshold
signal = [0.1, 0.3, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.2];
idx = 1;
threshold = 0.5;

while signal(idx) < threshold && idx < length(signal)
    idx = idx + 1;
end

if idx <= length(signal)
    disp(['Signal exceeds threshold at sample ', num2str(idx)]);
else
    disp('Signal never exceeds threshold');
end
```

**Explanation**: The while loop continues as long as the condition is true. Here, we increment `idx` until either the signal exceeds the threshold or we reach the end. The `&&` ensures we don't access beyond the signal length.

### 1.9 Common Beginner Mistakes and Debugging

**Mistake 1: Forgetting the Dot in Element-Wise Operations**

```matlab
% WRONG
x = [1, 2, 3];
y = [4, 5, 6];
result = x * y;  % ERROR: Dimensions don't match for matrix multiplication

% CORRECT
result = x .* y;  % Element-wise: [4, 10, 18]
```

**Mistake 2: Using Wrong Indexing**

```matlab
% WRONG
signal = [10, 20, 30];
first = signal(0);  % ERROR: MATLAB uses 1-based indexing

% CORRECT
first = signal(1);  % Returns 10
```

**Mistake 3: Dimension Mismatch in Operations**

```matlab
% WRONG
time = 0:0.01:1;      % 101 samples (row vector)
freq = [100, 200];    % 2 frequencies (row vector)
x = sin(2*pi*freq*time);  % ERROR: (1×2) × (1×101) incompatible

% CORRECT
freq = [100; 200];    % Column vector (2×1)
x = sin(2*pi*freq*time);  % (2×1) × (1×101) = (2×101) — each row is a signal
```

**Debugging Tools**

```matlab
% Use disp to print intermediate values
x = [1, 2, 3];
disp(['x = ', num2str(x)]);  % Shows: x = 1     2     3

% Check variable size and type
whos x;  % Shows size, type, and memory

% Use keyboard to pause execution and inspect variables
% (uncomment next line during debugging)
% keyboard;  % MATLAB pauses here; type variable names in Command Window

% Check for NaN (Not a Number) and Inf
result = sqrt(-1);  % NaN warning
filtered = result / 0;  % Inf

any_nan = any(isnan(result));  % Check if any NaN
any_inf = any(isinf(filtered));  % Check if any Inf
```

**Explanation**: `disp` prints values for inspection. `whos` shows variable details. `keyboard` halts execution, letting you examine variables interactively. `isnan` and `isinf` detect numerical problems. In DSP, you'll check for NaN (from invalid operations) and Inf (from division by zero).

---

## PART 2: PLOTTING AND VISUALIZATION

### 2.1 Why Visualization Is Essential in DSP

DSP is fundamentally about understanding signals—and signals are best understood visually. A filter's frequency response, aliasing effects, spectral content—all invisible in raw numbers but instantly clear in a plot. You'll plot constantly: signals before and after filtering, frequency spectra, system responses.

### 2.2 Continuous vs Discrete-Time Signals: plot vs stem

**plot: For Continuous-Time Signals or Smooth Visualization**

```matlab
clear all; clc;

fs = 1000;           % 1 kHz sampling
t = 0:1/fs:1;        % 1 second, 1000 samples
f = 10;              % 10 Hz sine wave
x = sin(2*pi*f*t);

figure;              % Create a new figure window
plot(t, x, 'b-', 'LineWidth', 2);  % Blue line, width 2 points

xlabel('Time (s)');
ylabel('Amplitude');
title('10 Hz Sine Wave (plot)');
grid on;
xlim([0, 0.5]);      % Show only first 0.5 seconds for clarity
```

**Explanation**: `plot(t, x)` connects sample points with lines, giving a smooth waveform visualization. This is appropriate for continuous-time interpretations or when sample density is high. `'b-'` specifies blue color and solid line. `'LineWidth'` controls thickness. `xlim([0, 0.5])` zooms to show the first half-second.

**stem: For Discrete-Time Signals**

```matlab
clear all; clc;

% Low sampling rate to show discrete nature
fs = 20;             % Only 20 samples per second
duration = 1;
t = 0:1/fs:duration-1/fs;  % 20 samples total
f = 2;               % 2 Hz sine wave
x = sin(2*pi*f*t);

figure;
stem(t, x, 'b', 'filled');  % 'filled' marks show solid dots

xlabel('Time (s)');
ylabel('Amplitude');
title('2 Hz Sine Wave at 20 Hz Sampling (stem)');
grid on;
```

**Explanation**: `stem` draws vertical lines from the x-axis to each sample point, emphasizing that the signal is discrete—values only exist at specific sample times. This is the "correct" visualization for digital signals. Compare the two: `plot` smoothly connects dots, while `stem` shows actual samples.

### 2.3 Labels, Titles, Legends, Grid

```matlab
clear all; clc;

fs = 8000;
t = 0:1/fs:0.01;  % First 10 ms only

% Generate two signals
x1 = sin(2*pi*440*t);   % 440 Hz (A note)
x2 = sin(2*pi*880*t);   % 880 Hz (A octave higher)

figure;
plot(t, x1, 'b-', 'LineWidth', 2, 'DisplayName', '440 Hz');
hold on;  % Don't replace the plot; add to it
plot(t, x2, 'r-', 'LineWidth', 2, 'DisplayName', '880 Hz');
hold off;

xlabel('Time (s)', 'FontSize', 12);
ylabel('Amplitude', 'FontSize', 12);
title('Two Sine Waves', 'FontSize', 14, 'FontWeight', 'bold');
legend('Location', 'northeast');  % Legend from DisplayName
grid on;
xlim([0, 0.005]);  % Show first 5 ms

% Save the figure
savefig('two_sines.fig');  % MATLAB format
saveas(gcf, 'two_sines.png');  % PNG format
```

**Explanation**: `hold on` keeps the previous plot and adds new lines. `DisplayName` labels each line for the legend. `legend` creates a box showing which color corresponds to which signal. `FontSize` and `FontWeight` control text appearance. `savefig` saves the figure for later, `saveas` exports as image.

### 2.4 Multiple Plots: Subplots

Subplots let you compare signals side-by-side or organize complex analysis.

```matlab
clear all; clc;

fs = 1000;
t = 0:1/fs:1;

% Three different signals
x1 = sin(2*pi*10*t);
x2 = sin(2*pi*50*t);
x3 = sin(2*pi*200*t);

figure('Position', [100, 100, 1200, 400]);  % Wide figure for 3 subplots

% Subplot 1: First signal
subplot(1, 3, 1);
plot(t, x1, 'b-', 'LineWidth', 1.5);
xlabel('Time (s)');
ylabel('Amplitude');
title('10 Hz Signal');
grid on;
xlim([0, 0.5]);

% Subplot 2: Second signal
subplot(1, 3, 2);
plot(t, x2, 'r-', 'LineWidth', 1.5);
xlabel('Time (s)');
ylabel('Amplitude');
title('50 Hz Signal');
grid on;
xlim([0, 0.5]);

% Subplot 3: Third signal
subplot(1, 3, 3);
plot(t, x3, 'g-', 'LineWidth', 1.5);
xlabel('Time (s)');
ylabel('Amplitude');
title('200 Hz Signal');
grid on;
xlim([0, 0.5]);

sgtitle('Three Sine Waves at Different Frequencies');  % Overall title
```

**Explanation**: `subplot(rows, cols, index)` creates a grid of subplots. `subplot(1, 3, 1)` means 1 row, 3 columns, and we're plotting in the 1st position. After plotting in a subplot, subsequent `plot` commands affect that subplot until you move to another with another `subplot` call. `sgtitle` adds a title above all subplots.

---

## PART 3: BASIC STANDARD SIGNALS

### 3.1 Unit Impulse

**Mathematical Definition**: The Dirac delta function δ[n]
- δ[n] = 1 when n = 0
- δ[n] = 0 when n ≠ 0

This is the "elementary" signal in DSP. The response of any LTI system to an impulse tells you everything about that system.

```matlab
clear all; clc;

% Generate unit impulse
N = 20;                    % Total samples
n = 0:N-1;                 % Sample indices
impulse = zeros(1, N);     % Initialize to zeros
impulse(1) = 1;            % Set first sample to 1 (impulse at n=0)

% Impulse shifted to middle
impulse_shifted = zeros(1, N);
impulse_shifted(10) = 1;   % Impulse at n=10

figure('Position', [100, 100, 1200, 400]);

subplot(1, 2, 1);
stem(n, impulse, 'b', 'filled', 'LineWidth', 2);
xlabel('Sample Index n');
ylabel('Amplitude');
title('Unit Impulse at n=0: δ[n]');
grid on;
ylim([-0.5, 1.5]);

subplot(1, 2, 2);
stem(n, impulse_shifted, 'r', 'filled', 'LineWidth', 2);
xlabel('Sample Index n');
ylabel('Amplitude');
title('Unit Impulse at n=10: δ[n-10]');
grid on;
ylim([-0.5, 1.5]);
```

**Explanation**: The impulse is the simplest signal—just a single 1 with zeros everywhere else. In a DSP system, applying an impulse reveals the system's behavior: the output is the system's impulse response h[n]. You'll use this concept constantly in filter design.

### 3.2 Unit Step

**Mathematical Definition**: The Heaviside step function u[n]
- u[n] = 1 for n ≥ 0
- u[n] = 0 for n < 0

```matlab
clear all; clc;

N = 20;
n = 0:N-1;

% Unit step starting at n=0
step = ones(1, N);
step(1:0) = [];  % No need to remove anything; this is a no-op
% Cleaner way:
step = n >= 0;   % Logical array: true (1) for all n≥0

% Unit step delayed to n=5
n_full = -5:15;
step_delayed = n_full >= 5;

figure('Position', [100, 100, 1200, 400]);

subplot(1, 2, 1);
stem(0:N-1, step, 'b', 'filled', 'LineWidth', 2);
xlabel('Sample Index n');
ylabel('Amplitude');
title('Unit Step u[n]');
grid on;
ylim([-0.5, 1.5]);

subplot(1, 2, 2);
stem(n_full, step_delayed, 'r', 'filled', 'LineWidth', 2);
xlabel('Sample Index n');
ylabel('Amplitude');
title('Delayed Step u[n-5]');
grid on;
ylim([-0.5, 1.5]);
```

**Explanation**: `n >= 0` creates a logical array (1s and 0s). This mimics the mathematical definition: the step is 1 from this point onward. The step signal models "turning on" a system at time n=0.

### 3.3 Ramp Signal

**Mathematical Definition**: r[n] = n·u[n]
- r[n] = n for n ≥ 0
- r[n] = 0 for n < 0

```matlab
clear all; clc;

N = 30;
n = 0:N-1;

% Simple ramp
ramp = n;

% Ramp with slope = 2
ramp_steep = 2 * n;

figure('Position', [100, 100, 1200, 400]);

subplot(1, 2, 1);
stem(n, ramp, 'b', 'filled', 'LineWidth', 1.5);
xlabel('Sample Index n');
ylabel('Amplitude');
title('Ramp Signal r[n] = n');
grid on;

subplot(1, 2, 2);
stem(n, ramp_steep, 'r', 'filled', 'LineWidth', 1.5);
xlabel('Sample Index n');
ylabel('Amplitude');
title('Ramp Signal r[n] = 2n');
grid on;
```

**Explanation**: A ramp increases linearly. The slope can be adjusted by multiplying by a constant. Ramps appear in many practical applications: frequency chirp signals, power-up transients, etc.

### 3.4 Exponential Signals

**Mathematical Definition**: x[n] = a^n · u[n]

Exponential signals decay (|a| < 1) or grow (|a| > 1) exponentially.

```matlab
clear all; clc;

N = 30;
n = 0:N-1;

% Decaying exponential
a_decay = 0.9;
decay_signal = a_decay .^ n;

% Decaying, slightly faster
a_decay2 = 0.7;
decay_signal2 = a_decay2 .^ n;

% Growing exponential
a_grow = 1.1;
grow_signal = a_grow .^ n;

figure('Position', [100, 100, 1200, 400]);

subplot(1, 2, 1);
stem(n, decay_signal, 'b', 'filled', 'LineWidth', 1.5);
hold on;
stem(n, decay_signal2, 'r', 'filled', 'LineWidth', 1.5);
hold off;
xlabel('Sample Index n');
ylabel('Amplitude');
title('Decaying Exponentials: a^n, a < 1');
legend('a = 0.9', 'a = 0.7');
grid on;
ylim([0, 1.2]);

subplot(1, 2, 2);
stem(n, grow_signal, 'g', 'filled', 'LineWidth', 1.5);
xlabel('Sample Index n');
ylabel('Amplitude');
title('Growing Exponential: a^n, a > 1');
grid on;
```

**Explanation**: The key is using element-wise power `.^`. For each n, we compute a^n. As n increases, if a < 1, the signal decays to zero; if a > 1, it grows. In practical DSP, decaying exponentials model damped vibrations, filter transients, etc.

### 3.5 Sinusoidal Signals

**Mathematical Definition**: x[n] = A·sin(2πfn/fs + φ)

This is the most important signal in DSP. All real-world signals are decomposed into sinusoids via Fourier analysis.

```matlab
clear all; clc;

fs = 8000;             % Sampling frequency: 8 kHz
duration = 0.05;       % Duration: 50 ms
t = 0:1/fs:duration-1/fs;  % Time vector

% Basic sine wave
f = 440;               % Frequency: 440 Hz (A note)
A = 1;                 % Amplitude
x_sin = A * sin(2*pi*f*t);

% Cosine wave (phase shifted by 90 degrees)
x_cos = A * cos(2*pi*f*t);

% Sine with phase shift
phase = pi/4;          % 45 degrees
x_phase = A * sin(2*pi*f*t + phase);

figure('Position', [100, 100, 1200, 600]);

subplot(3, 1, 1);
plot(t, x_sin, 'b-', 'LineWidth', 2);
xlabel('Time (s)');
ylabel('Amplitude');
title('Sine Wave: x[n] = sin(2π·440·n/8000)');
grid on;

subplot(3, 1, 2);
plot(t, x_cos, 'r-', 'LineWidth', 2);
xlabel('Time (s)');
ylabel('Amplitude');
title('Cosine Wave: x[n] = cos(2π·440·n/8000)');
grid on;

subplot(3, 1, 3);
plot(t, x_phase, 'g-', 'LineWidth', 2);
xlabel('Time (s)');
ylabel('Amplitude');
title(['Phase-Shifted Sine: x[n] = sin(2π·440·n/8000 + π/4)']);
grid on;
```

**Explanation**: The argument to `sin` must be in radians. `2*pi*f*t` gives the phase in radians. `f` is frequency in Hz, `fs` is sampling rate. Cosine is sine shifted by 90°. Adding a phase constant shifts the entire waveform left or right. Phase is crucial in signal processing—two signals at the same frequency but different phases behave very differently in a system.

### 3.6 Damped Sinusoid

**Mathematical Definition**: x[n] = A·e^(-ζωn/fs)·sin(2πfn/fs + φ)

Damped sinusoids combine exponential decay with oscillation—models realistic vibrations, transients, antenna responses.

```matlab
clear all; clc;

fs = 1000;             % 1 kHz sampling
duration = 0.5;        % 0.5 seconds
t = 0:1/fs:duration-1/fs;

f = 50;                % Oscillation frequency: 50 Hz
A = 1;                 % Initial amplitude
decay_rate = 3;        % Decay time constant (per second)

% Damped sinusoid
envelope = A * exp(-decay_rate * t);  % Exponential decay envelope
x_damped = envelope .* sin(2*pi*f*t);  % Element-wise multiply for modulation

figure;
plot(t, x_damped, 'b-', 'LineWidth', 1.5, 'DisplayName', 'Damped sinusoid');
hold on;
plot(t, envelope, 'r--', 'LineWidth', 2, 'DisplayName', 'Decay envelope');
plot(t, -envelope, 'r--', 'LineWidth', 2, 'HandleVisibility', 'off');
hold off;

xlabel('Time (s)');
ylabel('Amplitude');
title('Damped Sinusoid: A·e^{-ζt}·sin(2πft)');
legend;
grid on;
```

**Explanation**: The element-wise multiplication `envelope .* sin(...)` multiplies each sample of the sine wave by the corresponding envelope value. The result oscillates but with decreasing amplitude—realistic for vibrations, electromagnetic pulses, etc. The dotted line shows the exponential envelope that bounds the oscillation.

### 3.7 Signal Operations: Shifting, Scaling, Reversal

These operations are fundamental in convolution and correlation.

```matlab
clear all; clc;

N = 10;
n = 0:N-1;
x_original = sin(2*pi*1*n/N);  % 1-cycle sine wave

% Amplitude scaling
x_scaled = 2 * x_original;  % Double amplitude

% Time-domain shifting (left = advance, right = delay)
% Shift left by 3: x[n+3]
shift_amount = 3;
x_shifted_left = [x_original(shift_amount+1:end), zeros(1, shift_amount)];

% Shift right by 3: x[n-3]
x_shifted_right = [zeros(1, shift_amount), x_original(1:end-shift_amount)];

% Reversal (time-reversal): x[-n]
x_reversed = flip(x_original);

figure('Position', [100, 100, 1200, 600]);

subplot(3, 2, 1);
stem(n, x_original, 'b', 'filled');
title('Original: x[n]');
ylabel('Amplitude');
grid on;
ylim([-1.5, 1.5]);

subplot(3, 2, 2);
stem(n, x_scaled, 'r', 'filled');
title('Scaled: 2·x[n]');
ylabel('Amplitude');
grid on;
ylim([-1.5, 1.5]);

subplot(3, 2, 3);
stem(n, x_shifted_left, 'g', 'filled');
title('Shifted Left: x[n+3]');
ylabel('Amplitude');
grid on;
ylim([-1.5, 1.5]);

subplot(3, 2, 4);
stem(n, x_shifted_right, 'm', 'filled');
title('Shifted Right: x[n-3]');
ylabel('Amplitude');
grid on;
ylim([-1.5, 1.5]);

subplot(3, 2, 5);
stem(n, x_reversed, 'c', 'filled');
title('Reversed: x[-n]');
ylabel('Amplitude');
grid on;
ylim([-1.5, 1.5]);

subplot(3, 2, 6);
stem(n, x_scaled .* x_reversed, 'k', 'filled');
title('Scaled & Reversed: 2·x[-n]');
ylabel('Amplitude');
grid on;
ylim([-1.5, 1.5]);
```

**Explanation**: Shifting in code is tricky. To shift left by 3 (`x[n+3]`), you remove the first 3 samples and pad with zeros at the end. To shift right by 3 (`x[n-3]`), you pad with zeros at the start. `flip` reverses the vector. These operations are essential for correlation and designing filters.

---

## PART 4: SIGNALS AND SYSTEMS (LTI SYSTEMS)

### 4.1 Discrete-Time Signals vs Continuous-Time

Discrete-time signals exist only at sample times, determined by sampling frequency.

```matlab
clear all; clc;

% Continuous-time representation (mathematical)
t_cont = 0:0.001:1;  % Very fine resolution (1000 points per second)
x_continuous = sin(2*pi*5*t_cont);

% Discrete-time representation (physical reality)
fs = 50;             % 50 Hz sampling
t_discrete = 0:1/fs:1;
x_discrete = sin(2*pi*5*t_discrete);

figure('Position', [100, 100, 1200, 400]);

subplot(1, 2, 1);
plot(t_cont, x_continuous, 'b-', 'LineWidth', 2);
xlabel('Time (s)');
ylabel('Amplitude');
title('Continuous-Time: High Resolution');
grid on;
xlim([0, 0.5]);

subplot(1, 2, 2);
stem(t_discrete, x_discrete, 'r', 'filled', 'LineWidth', 2);
xlabel('Time (s)');
ylabel('Amplitude');
title(['Discrete-Time: fs = ', num2str(fs), ' Hz']);
grid on;
xlim([0, 0.5]);
```

**Explanation**: Sampling converts continuous signals to discrete samples. The sampling frequency fs determines the spacing between samples. If fs is too low relative to signal frequency, aliasing occurs (a 5 Hz signal sampled at 10 Hz appears as only 2 cycles in 1 second).

### 4.2 LTI Systems and the Impulse Response

An **LTI (Linear Time-Invariant) system** has two critical properties:
- **Linearity**: If input x₁ produces output y₁ and input x₂ produces output y₂, then input ax₁ + bx₂ produces output ay₁ + by₂.
- **Time-Invariance**: If x[n] produces y[n], then x[n-k] produces y[n-k].

The **impulse response h[n]** is the output when the input is δ[n]. Everything about the system is encoded in h[n].

```matlab
clear all; clc;

% Define a simple LTI system's impulse response
% h[n] = 0.5 * δ[n] + 0.3 * δ[n-1] + 0.1 * δ[n-2]
% (This represents: output = 0.5*input[n] + 0.3*input[n-1] + 0.1*input[n-2])

h = [0.5, 0.3, 0.1];  % Impulse response coefficients

% Test 1: Input is impulse δ[n]
impulse_in = [1, 0, 0, 0, 0];
output_impulse = conv(impulse_in, h);  % Convolution
disp('Input: δ[n]');
disp(['Output: ', num2str(output_impulse)]);

% Test 2: Input is step u[n]
step_in = ones(1, 10);
output_step = conv(step_in, h);
disp('Input: u[n] (10 samples)');
disp(['Output length: ', num2str(length(output_step))]);

figure('Position', [100, 100, 1200, 400]);

subplot(1, 2, 1);
stem(0:length(output_impulse)-1, output_impulse, 'b', 'filled');
xlabel('Sample n');
ylabel('Amplitude');
title('System Response to Impulse');
grid on;

subplot(1, 2, 2);
stem(0:length(output_step)-1, output_step, 'r', 'filled');
xlabel('Sample n');
ylabel('Amplitude');
title('System Response to Step');
grid on;
```

**Explanation**: `conv(x, h)` computes linear convolution—the fundamental operation in DSP. The impulse response h[n] = [0.5, 0.3, 0.1] means the output is a weighted sum of the input and its two previous values. When the input is an impulse, the output is exactly h[n]. When the input is a step, the output accumulates over time.

### 4.3 Difference Equations

A difference equation describes an LTI system recursively:

y[n] = a₀x[n] + a₁x[n-1] + ... - b₁y[n-1] - b₂y[n-2] - ...

The feedforward part (a coefficients) depends on inputs; the feedback part (b coefficients) makes the system have memory (infinite impulse response).

```matlab
clear all; clc;

% First-order system: y[n] = 0.4*x[n] + 0.6*y[n-1]
% (This is like a low-pass filter with coefficient 0.6)

x = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];  % Impulse input

y = zeros(1, 10);  % Initialize output
a = 0.4;           % Feedforward coefficient
b = 0.6;           % Feedback coefficient

% Compute output sample by sample
for n = 1:length(x)
    y(n) = a * x(n);  % Feedforward term
    if n > 1
        y(n) = y(n) + b * y(n-1);  % Feedback term
    end
end

disp(['Input (impulse): ', num2str(x)]);
disp(['Output: ', num2str(y)]);

% Verify with theoretical impulse response
% For y[n] = a*x[n] + b*y[n-1], the impulse response is h[n] = a*b^n
h_theoretical = a * (b .^ (0:9));
disp(['Theoretical h[n]: ', num2str(h_theoretical)]);

figure;
stem(0:9, y, 'b', 'filled', 'LineWidth', 2, 'DisplayName', 'Computed');
hold on;
stem(0:9, h_theoretical, 'r--', 'LineWidth', 2, 'DisplayName', 'Theoretical');
hold off;
xlabel('Sample n');
ylabel('Amplitude');
title(['Impulse Response: y[n] = ', num2str(a), '·x[n] + ', num2str(b), '·y[n-1]']);
legend;
grid on;
```

**Explanation**: The loop processes the difference equation sample by sample. For n=1 (first sample), y(1) = 0.4 * 1 = 0.4 (no feedback). For n=2, y(2) = 0.4 * 0 + 0.6 * 0.4 = 0.24. The feedback coefficient 0.6 causes exponential decay, like a charge leaking from a capacitor. This is the foundation of IIR filters.

### 4.4 Stability: Bounded-Input, Bounded-Output (BIBO)

A system is BIBO stable if every bounded input produces a bounded output. For an IIR system, this depends on the feedback coefficients.

**Rule**: For a first-order system y[n] = a·x[n] + b·y[n-1], the system is stable if |b| < 1.

More generally, if the impulse response h[n] satisfies Σ|h[n]| < ∞, the system is stable.

```matlab
clear all; clc;

% Stable system: b = 0.8 (|b| < 1)
b_stable = 0.8;
h_stable = 0.4 * (b_stable .^ (0:50));

% Unstable system: b = 1.2 (|b| > 1)
b_unstable = 1.2;
h_unstable = 0.4 * (b_unstable .^ (0:50));

% Marginally stable: b = 1.0 (|b| = 1)
b_marginal = 1.0;
h_marginal = 0.4 * ones(1, 51);

figure('Position', [100, 100, 1200, 400]);

subplot(1, 3, 1);
stem(0:50, h_stable, 'b', 'filled');
xlabel('Sample n');
ylabel('h[n]');
title(['Stable: b = ', num2str(b_stable)]);
grid on;
set(gca, 'YLim', [0, 0.5]);

subplot(1, 3, 2);
stem(0:50, h_marginal, 'g', 'filled');
xlabel('Sample n');
ylabel('h[n]');
title(['Marginally Stable: b = ', num2str(b_marginal)]);
grid on;
set(gca, 'YLim', [0, 0.5]);

subplot(1, 3, 3);
stem(0:50, h_unstable(1:51), 'r', 'filled');
xlabel('Sample n');
ylabel('h[n]');
title(['Unstable: b = ', num2str(b_unstable)]);
grid on;
set(gca, 'YLim', [0, 100]);

sgtitle('Impulse Response Decay vs Stability');
```

**Explanation**: The stable system's impulse response decays exponentially to zero. The unstable system grows without bound, meaning even a small input could cause the output to diverge. In filter design, you must ensure stability by constraining feedback coefficients.

### 4.5 Linear Convolution (time-domain filtering)

Convolution is the mathematical operation underlying all digital filtering. It expresses how a signal x[n] is transformed by a system with impulse response h[n]:

y[n] = Σ h[k]·x[n-k]

```matlab
clear all; clc;

% Input signal: two impulses
x = [1, 0, 0, 1, 0, 0, 0];

% Impulse response (a simple filter)
h = [1, 0.5, 0.25];

% Compute convolution
y = conv(x, h);

% Manual computation for understanding
% y[0] = h[0]*x[0] = 1*1 = 1
% y[1] = h[0]*x[1] + h[1]*x[0] = 1*0 + 0.5*1 = 0.5
% y[2] = h[0]*x[2] + h[1]*x[1] + h[2]*x[0] = 1*0 + 0.5*0 + 0.25*1 = 0.25
% y[3] = h[0]*x[3] + h[1]*x[2] + h[2]*x[1] = 1*1 + 0.5*0 + 0.25*0 = 1
% ... and so on

disp('Input x[n]:');
disp(x);
disp('Impulse response h[n]:');
disp(h);
disp('Output y[n] = conv(x, h):');
disp(y);

figure('Position', [100, 100, 1200, 600]);

subplot(3, 1, 1);
stem(0:length(x)-1, x, 'b', 'filled');
xlabel('Sample n');
ylabel('Amplitude');
title('Input Signal x[n]');
grid on;
ylim([0, 1.2]);

subplot(3, 1, 2);
stem(0:length(h)-1, h, 'r', 'filled');
xlabel('Sample n');
ylabel('Amplitude');
title('Impulse Response h[n] (Moving Average Filter)');
grid on;
ylim([0, 1.2]);

subplot(3, 1, 3);
stem(0:length(y)-1, y, 'g', 'filled');
xlabel('Sample n');
ylabel('Amplitude');
title('Output y[n] = conv(x[n], h[n])');
grid on;

% Verify convolution properties
sum_x = sum(x);
sum_h = sum(h);
sum_y = sum(y);
disp(['Sum of input: ', num2str(sum_x)]);
disp(['Sum of h: ', num2str(sum_h)]);
disp(['Sum of output (should equal sum_x * sum_h): ', num2str(sum_y), ' vs expected ', num2str(sum_x*sum_h)]);
```

**Explanation**: Convolution slides the impulse response over the input and computes a weighted sum at each position. The output length is `len(x) + len(h) - 1`. The convolution distributes the impulses through the system's response, creating the output. This is filtering in its purest form.

### 4.6 Circular Convolution (frequency-domain cycling)

When signals are periodic (as in the DFT), convolution becomes circular convolution. MATLAB's `cconv` function computes this.

```matlab
clear all; clc;

% Periodic input signal (2 periods of a pattern)
x = [1, 0, 1, 0];

% Short filter
h = [1, 0.5];

% Linear convolution (usual result)
y_linear = conv(x, h);

% Circular convolution (for periodic signals)
N = length(x);
y_circular = cconv(x, h, N);  % Last argument: length of circular convolution

disp('Input x[n] (periodic):');
disp(x);
disp('Filter h[n]:');
disp(h);
disp('Linear convolution result:');
disp(y_linear);
disp(['(length: ', num2str(length(y_linear)), ')']);
disp('Circular convolution result (period 4):');
disp(y_circular);
disp(['(length: ', num2str(length(y_circular)), ')']);

% Visualization
figure('Position', [100, 100, 1200, 400]);

subplot(1, 2, 1);
stem(0:length(y_linear)-1, y_linear, 'b', 'filled');
xlabel('Sample n');
ylabel('Amplitude');
title('Linear Convolution');
grid on;

subplot(1, 2, 2);
stem(0:length(y_circular)-1, y_circular, 'r', 'filled');
xlabel('Sample n');
ylabel('Amplitude');
title('Circular Convolution (N=4)');
grid on;
```

**Explanation**: Circular convolution "wraps around"—samples that would fall off the end wrap back to the beginning. This happens when you use FFT-based filtering on finite-length signals. It's efficient but can cause artifacts if not managed carefully (hence overlap-add and overlap-save methods).

---

## PART 5: FREQUENCY-DOMAIN ANALYSIS

### 5.1 Motivation: Why Frequency Domain?

Real signals are complex mixtures of frequency components. The time-domain shows *when* events happen; the frequency-domain shows *what frequencies* are present and with what amplitude and phase. Filters, noise analysis, and system identification all benefit from frequency-domain thinking.

### 5.2 DTFT (Discrete-Time Fourier Transform)

**Mathematical Definition**: X(e^(jω)) = Σ x[n]e^(-jωn)

The DTFT decomposes a signal into complex exponentials at frequencies ω ∈ [0, 2π].

**CRITICAL**: The DTFT is continuous in frequency. You can't compute it directly for all frequencies; instead, we evaluate it at specific points.

```matlab
clear all; clc;

% Simple signal: two sine waves
fs = 1000;  % 1 kHz sampling
t = 0:1/fs:0.5;  % 0.5 seconds
x = sin(2*pi*50*t) + 0.5*sin(2*pi*150*t);

% Compute DTFT at specific frequencies
frequencies = 0:1:300;  % Hz
omega = 2*pi*frequencies/fs;  % Convert to normalized angular frequency

N = length(x);
X_dtft = zeros(size(omega));

for k = 1:length(omega)
    % X(e^jω) = Σ x[n] * e^(-jωn)
    X_dtft(k) = sum(x .* exp(-1j*omega(k)*(0:N-1)));
end

% Extract magnitude spectrum
magnitude = abs(X_dtft);

figure('Position', [100, 100, 1200, 400]);

subplot(1, 2, 1);
plot(t, x, 'b-', 'LineWidth', 1.5);
xlabel('Time (s)');
ylabel('Amplitude');
title('Input Signal: 50 Hz + 150 Hz');
grid on;
xlim([0, 0.1]);  % Show first 100 ms

subplot(1, 2, 2);
plot(frequencies, magnitude, 'r-', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('|X(e^{jω})|');
title('DTFT Magnitude Spectrum');
grid on;
xlim([0, 300]);
```

**Explanation**: The loop evaluates the DTFT at each frequency. The term `exp(-1j*omega(k)*(0:N-1))` creates complex exponentials at that frequency for all n. The magnitude shows that peaks occur at 50 Hz and 150 Hz—exactly the frequencies in the input signal. The factor N scales the magnitude; normalizing by 1/N would match power calculations.

### 5.3 DFT (Discrete Fourier Transform)

The **DFT** evaluates the DTFT at N equally-spaced frequencies, where N is the signal length. It's periodic with period fs (the sampling frequency).

```matlab
clear all; clc;

% Signal: 100 Hz sine wave at 1 kHz sampling
fs = 1000;
duration = 1;  % 1 second
t = 0:1/fs:duration-1/fs;
x = sin(2*pi*100*t);

% Compute DFT
X = fft(x);  % MATLAB's FFT (fast implementation of DFT)

% Frequency axis
N = length(x);
freq_axis = (0:N-1)*fs/N;  % Frequency for each DFT bin

% Magnitude spectrum (one-sided, normalized)
magnitude_one_sided = 2*abs(X(1:N/2))/N;
magnitude_one_sided(1) = magnitude_one_sided(1)/2;  % DC component
freq_one_sided = freq_axis(1:N/2);

% Phase spectrum
phase = angle(X);

figure('Position', [100, 100, 1200, 600]);

subplot(3, 1, 1);
plot(t, x, 'b-', 'LineWidth', 1);
xlabel('Time (s)');
ylabel('Amplitude');
title('Input: 100 Hz Sine Wave');
grid on;
xlim([0, 0.05]);

subplot(3, 1, 2);
plot(freq_one_sided, magnitude_one_sided, 'r-', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('DFT Magnitude Spectrum (One-Sided)');
grid on;
xlim([0, 300]);

subplot(3, 1, 3);
plot(freq_one_sided, phase(1:N/2)*180/pi, 'g-', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Phase (degrees)');
title('DFT Phase Spectrum');
grid on;
xlim([0, 300]);
ylim([-180, 180]);
```

**Explanation**: `fft` computes the DFT very efficiently (O(N log N) vs O(N²) for naive DFT). The frequency axis is constructed as `(0:N-1)*fs/N`—each bin represents fs/N Hz. The magnitude is doubled for the one-sided spectrum (all energy is in positive frequencies due to real signals being conjugate-symmetric). The phase angle shows the initial phase of each frequency component.

### 5.4 FFT (Fast Fourier Transform)

The FFT is not a new transform; it's an efficient algorithm for computing the DFT. MATLAB's `fft` automatically optimizes for best speed.

**Key insight**: FFT is fastest when N is a power of 2 (N = 2^k). If your signal length isn't a power of 2, you might pad with zeros.

```matlab
clear all; clc;

% Signal with non-power-of-2 length
x = sin(2*pi*[0:1000]/1000);  % 1001 samples

% Compute FFT without padding
X_padded = fft(x);  % MATLAB pads automatically for efficiency

% Better: explicitly pad to next power of 2
N_next_power = 2^nextpow2(length(x));  % 1024
x_padded = [x, zeros(1, N_next_power - length(x))];
X_padded_explicit = fft(x_padded);

% Time both methods
tic;
for iter = 1:1000
    X_test = fft(x);
end
time_unpadded = toc;

tic;
for iter = 1:1000
    X_test = fft(x_padded);
end
time_padded = toc;

disp(['FFT of ', num2str(length(x)), ' samples: ', num2str(time_unpadded), ' s']);
disp(['FFT of ', num2str(N_next_power), ' samples (padded): ', num2str(time_padded), ' s']);
disp(['Speedup: ', num2str(time_unpadded/time_padded), 'x']);

% Frequency resolution improves with padding
fs = 1000;
freq_resolution_original = fs / length(x);
freq_resolution_padded = fs / N_next_power;
disp(['Frequency resolution (original): ', num2str(freq_resolution_original), ' Hz']);
disp(['Frequency resolution (padded): ', num2str(freq_resolution_padded), ' Hz']);
```

**Explanation**: Padding with zeros increases frequency resolution (frequency bins become finer) without changing the signal. The FFT is fastest with power-of-2 lengths. `nextpow2` finds the next power of 2 greater than the input length. Padding doesn't add information, but it makes the frequency spacing finer and the computation slightly faster.

### 5.5 Aliasing Demonstration

**Nyquist Theorem**: To avoid aliasing, the sampling frequency must be at least twice the highest frequency present in the signal.

If fs < 2*f_max, high frequencies "fold back" and appear as lower frequencies.

```matlab
clear all; clc;

% True signal: 700 Hz sine wave
f_true = 700;  % Hz
duration = 0.01;  % 10 ms

% Scenario 1: Adequate sampling (fs = 2000 Hz > 2*700 Hz)
fs_adequate = 2000;
t_adequate = 0:1/fs_adequate:duration-1/fs_adequate;
x_adequate = sin(2*pi*f_true*t_adequate);

% Scenario 2: Insufficient sampling (fs = 1000 Hz < 2*700 Hz)
fs_insufficient = 1000;
t_insufficient = 0:1/fs_insufficient:duration-1/fs_insufficient;
x_insufficient = sin(2*pi*f_true*t_insufficient);

% Nyquist frequency for each sampling rate
f_nyquist_adequate = fs_adequate/2;
f_nyquist_insufficient = fs_insufficient/2;

% The aliased frequency appears at |f_true - fs| if f_true > fs/2
f_aliased = f_true - fs_insufficient;
disp(['True frequency: ', num2str(f_true), ' Hz']);
disp(['Sampling rate (adequate): ', num2str(fs_adequate), ' Hz, Nyquist = ', num2str(f_nyquist_adequate), ' Hz']);
disp(['Sampling rate (insufficient): ', num2str(fs_insufficient), ' Hz, Nyquist = ', num2str(f_nyquist_insufficient), ' Hz']);
disp(['Aliased frequency: ', num2str(f_aliased), ' Hz']);

figure('Position', [100, 100, 1200, 600]);

subplot(2, 2, 1);
plot(t_adequate*1000, x_adequate, 'b-', 'LineWidth', 2);
stem(t_adequate*1000, x_adequate, 'b', 'filled', 'LineWidth', 1);
xlabel('Time (ms)');
ylabel('Amplitude');
title(['Adequate Sampling: fs = ', num2str(fs_adequate), ' Hz (', num2str(fs_adequate/(2*f_true)), 'x Nyquist rate)']);
grid on;

subplot(2, 2, 2);
plot(t_insufficient*1000, x_insufficient, 'r-', 'LineWidth', 2);
stem(t_insufficient*1000, x_insufficient, 'r', 'filled', 'LineWidth', 1);
xlabel('Time (ms)');
ylabel('Amplitude');
title(['Undersampling: fs = ', num2str(fs_insufficient), ' Hz (', num2str(fs_insufficient/(2*f_true)), 'x Nyquist rate)']);
grid on;

% FFT of both
X_adequate = abs(fft(x_adequate));
X_insufficient = abs(fft(x_insufficient));
freq_adequate = (0:length(x_adequate)-1)*fs_adequate/length(x_adequate);
freq_insufficient = (0:length(x_insufficient)-1)*fs_insufficient/length(x_insufficient);

subplot(2, 2, 3);
plot(freq_adequate(1:length(freq_adequate)/2), X_adequate(1:length(X_adequate)/2), 'b-', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('DFT: Adequate Sampling');
grid on;
xlim([0, 1000]);

subplot(2, 2, 4);
plot(freq_insufficient(1:length(freq_insufficient)/2), X_insufficient(1:length(X_insufficient)/2), 'r-', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('DFT: Undersampling (Aliasing)');
grid on;
xlim([0, 500]);
```

**Explanation**: With adequate sampling, the FFT shows a peak at the true frequency (700 Hz). With undersampling, the same signal appears as only 300 Hz—the aliased frequency. Aliasing is irreversible; you can't recover the original signal. This is why anti-aliasing filters are essential before sampling in real ADCs (like your RF measurement systems).

### 5.6 Windowing: Rectangular, Hamming, Hanning

When you apply FFT to a finite signal, you're implicitly multiplying by a rectangular window (1 for the signal duration, 0 elsewhere). This causes **spectral leakage**—energy from one frequency "leaks" into neighboring bins.

Better windows taper the edges smoothly to reduce leakage.

```matlab
clear all; clc;

% Signal: pure 100.5 Hz sine (between DFT bins)
fs = 1000;
duration = 1;
t = 0:1/fs:duration-1/fs;
f = 100.5;  % NOT an integer multiple of fs/N
x = sin(2*pi*f*t);

% Apply three different windows
rect_window = ones(size(x));
hamm_window = hamming(length(x))';
hann_window = hanning(length(x))';

% Apply windows
x_rect = x .* rect_window;
x_hamm = x .* hamm_window;
x_hann = x .* hann_window;

% Compute FFTs (one-sided)
N = length(x);
X_rect = abs(fft(x_rect));
X_hamm = abs(fft(x_hamm));
X_hann = abs(fft(x_hann));

freq = (0:N-1)*fs/N;

% Plot windows and their effects
figure('Position', [100, 100, 1200, 600]);

% Windows in time domain
subplot(2, 3, 1);
plot(t(1:100), rect_window(1:100), 'b-', 'LineWidth', 2);
title('Rectangular Window');
xlabel('Time (s)');
ylabel('Amplitude');
grid on;

subplot(2, 3, 2);
plot(t(1:100), hamm_window(1:100), 'r-', 'LineWidth', 2);
title('Hamming Window');
xlabel('Time (s)');
ylabel('Amplitude');
grid on;

subplot(2, 3, 3);
plot(t(1:100), hann_window(1:100), 'g-', 'LineWidth', 2);
title('Hanning Window');
xlabel('Time (s)');
ylabel('Amplitude');
grid on;

% Frequency spectra (zoomed in)
subplot(2, 3, 4);
plot(freq(1:N/2), X_rect(1:N/2)/max(X_rect(1:N/2)), 'b-', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Normalized Magnitude');
title('Rectangular Window (Leakage)');
grid on;
xlim([80, 120]);

subplot(2, 3, 5);
plot(freq(1:N/2), X_hamm(1:N/2)/max(X_hamm(1:N/2)), 'r-', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Normalized Magnitude');
title('Hamming Window (Better)');
grid on;
xlim([80, 120]);

subplot(2, 3, 6);
plot(freq(1:N/2), X_hann(1:N/2)/max(X_hann(1:N/2)), 'g-', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Normalized Magnitude');
title('Hanning Window (Best)');
grid on;
xlim([80, 120]);

sgtitle('Windowing Effect on Spectral Leakage');
```

**Explanation**: The rectangular window (unwindowed signal) shows severe leakage—high sidelobes around the true frequency. Hamming and Hanning windows taper the edges, reducing sidelobes at the cost of a slightly wider main lobe. Hamming has lower sidelobes; Hanning is more symmetric. Choose based on whether you prioritize frequency resolution (narrow main lobe) or sidelobe suppression.

### 5.7 Periodogram: Power Spectral Density

The **periodogram** estimates the power at each frequency. For real signals, it's computed as |DFT|²/N (approximately, normalization varies).

```matlab
clear all; clc;

% Noisy signal: two sine waves + white noise
fs = 1000;
t = 0:1/fs:10-1/fs;  % 10 seconds
x = sin(2*pi*50*t) + 0.5*sin(2*pi*150*t) + 0.5*randn(size(t));

% Compute periodogram
[Pxx, f] = periodogram(x, [], [], fs);  % Last argument: sampling frequency

% Plot
figure('Position', [100, 100, 1200, 400]);

subplot(1, 2, 1);
plot(t, x, 'b-', 'LineWidth', 0.5);
xlabel('Time (s)');
ylabel('Amplitude');
title('Noisy Signal: 50 Hz + 150 Hz + Noise');
grid on;
xlim([0, 2]);

subplot(1, 2, 2);
semilogy(f, Pxx, 'b-', 'LineWidth', 1.5);
xlabel('Frequency (Hz)');
ylabel('Power (V²/Hz)');
title('Periodogram (Power Spectral Density)');
grid on;
xlim([0, 400]);

% Find peaks
[pxx_peaks, peak_locs] = findpeaks(Pxx, f, 'MinPeakHeight', 0.01, 'MinPeakDistance', 20);
hold on;
plot(peak_locs, pxx_peaks, 'ro', 'MarkerSize', 8);
hold off;
```

**Explanation**: `periodogram` computes the power spectral density (PSD), showing power vs frequency. The `semilogy` (logarithmic y-axis) reveals both large and small components. Peaks at 50 and 150 Hz show the signal content; the baseline is noise. The `findpeaks` function identifies spectral peaks automatically—useful for feature extraction.

---

## PART 6: DIGITAL FILTERS

### 6.1 Why Digital Filters?

Filters separate useful signal from noise. They're essential in:
- Audio/music: equalizers, effect processing
- RF/wireless: channel selection, interference rejection
- Medical: ECG noise removal, EEG artifact suppression
- Instrumentation: sensor data smoothing

Two types:
- **FIR (Finite Impulse Response)**: Impulse response h[n] has finite length. Always stable, can have linear phase.
- **IIR (Infinite Impulse Response)**: Uses feedback, impulse response decays over time. More efficient but requires stability checks.

### 6.2 FIR Filters: Moving Average (Simplest Filter)

A moving average filter smooths by averaging consecutive samples.

```matlab
clear all; clc;

% Noisy signal
fs = 1000;
t = 0:1/fs:1;
signal = sin(2*pi*10*t);
noise = 0.5*randn(size(t));
x_noisy = signal + noise;

% Moving average filter (kernel size 5)
filter_length = 5;
h_moving_avg = ones(1, filter_length) / filter_length;

% Apply filter
y_filtered = conv(x_noisy, h_moving_avg, 'same');
% 'same' returns output same length as input

figure('Position', [100, 100, 1200, 500]);

subplot(2, 1, 1);
plot(t, x_noisy, 'b-', 'LineWidth', 0.5, 'DisplayName', 'Noisy signal');
hold on;
plot(t, y_filtered, 'r-', 'LineWidth', 2, 'DisplayName', 'Filtered (MA)');
hold off;
xlabel('Time (s)');
ylabel('Amplitude');
title('Moving Average Filter: Kernel Size = 5');
legend;
grid on;
xlim([0, 0.3]);

% Frequency response
[h_freq, f_freq] = freqz(h_moving_avg, 1, 1024, fs);
subplot(2, 1, 2);
plot(f_freq, 20*log10(abs(h_freq)+1e-10), 'b-', 'LineWidth', 2);
xlabel('Frequency (Hz)');
ylabel('Magnitude (dB)');
title('Moving Average Filter Frequency Response');
grid on;
xlim([0, 500]);
ylim([-40, 5]);
```

**Explanation**: The moving average filter h = [0.2, 0.2, 0.2, 0.2, 0.2] (normalized) smooths by replacing each sample with the average of itself and neighbors. `conv(..., 'same')` returns output the same length as input (edge-handling). The frequency response shows that low frequencies pass (magnitude ≈ 0 dB) while high frequencies are attenuated, making it a low-pass filter.

### 6.3 FIR Filter Design: Window Method

Design a low-pass filter by:
1. Compute ideal impulse response
2. Window it to finite length
3. Check frequency response

```matlab
clear all; clc;

% Specifications
fs = 1000;                % Sampling frequency
Wn = 0.2;                % Normalized cutoff frequency (0 to 1, where 1 = fs/2)
filter_order = 51;       % Odd length for linear phase

% Method 1: fir1 (built-in design)
b_fir = fir1(filter_order - 1, Wn, 'low', hanning(filter_order));

% Method 2: Manual design from ideal response (educational)
% Ideal low-pass: h_ideal[n] = 2*Wn*sinc(2*Wn*n)
n = -(filter_order-1)/2:(filter_order-1)/2;
h_ideal = 2*Wn*sinc(2*Wn*n);
h_windowed = h_ideal .* hanning(filter_order)';

figure('Position', [100, 100, 1200, 600]);

% Impulse response
subplot(2, 2, 1);
stem(0:length(b_fir)-1, b_fir, 'b', 'filled');
xlabel('Sample n');
ylabel('Coefficient');
title('FIR Filter Impulse Response (fir1 design)');
grid on;

% Ideal impulse response
subplot(2, 2, 2);
stem(n, h_windowed, 'r', 'filled');
xlabel('Sample n');
ylabel('Coefficient');
title('Manual Design: Ideal LP + Hanning Window');
grid on;

% Frequency response (magnitude)
[H_mag, f_resp] = freqz(b_fir, 1, 1024, fs);
subplot(2, 2, 3);
plot(f_resp, 20*log10(abs(H_mag)+1e-10), 'b-', 'LineWidth', 2);
xlabel('Frequency (Hz)');
ylabel('Magnitude (dB)');
title('Magnitude Response');
grid on;
ylim([-60, 5]);

% Phase response
subplot(2, 2, 4);
phase_resp = unwrap(angle(H_mag))*180/pi;
plot(f_resp, phase_resp, 'r-', 'LineWidth', 2);
xlabel('Frequency (Hz)');
ylabel('Phase (degrees)');
title('Phase Response (Linear = constant slope)');
grid on;
```

**Explanation**: `fir1` is MATLAB's built-in FIR designer. It creates a linear-phase filter (symmetric h[n] ensures constant group delay). The frequency response shows the passband (0–200 Hz, -3dB cutoff) and stopband attenuation. Manual design using the ideal response and windowing teaches the underlying theory: `sinc` creates the ideal response, windowing tails it.

### 6.4 IIR Filters: Butterworth

IIR filters use feedback to achieve steep frequency responses with fewer coefficients than FIR.

```matlab
clear all; clc;

% Butterworth low-pass specifications
fs = 1000;
Wp = 100;              % Passband edge: 100 Hz
Ws = 200;              % Stopband edge: 200 Hz
Rp = 3;                % Passband ripple: 3 dB
Rs = 40;               % Stopband attenuation: 40 dB

% Design filter
[order, Wn_design] = buttord(Wp/(fs/2), Ws/(fs/2), Rp, Rs);
[b_butter, a_butter] = butter(order, Wn_design);

disp(['Butterworth filter order: ', num2str(order)]);
disp(['Designed cutoff frequency: ', num2str(Wn_design*fs/2), ' Hz']);

% Frequency response
[H_butter, f_butter] = freqz(b_butter, a_butter, 1024, fs);

% Compare with FIR
b_fir_compare = fir1(100, 0.2);  % Order 100 for similar attenuation
[H_fir_compare, f_fir_compare] = freqz(b_fir_compare, 1, 1024, fs);

figure('Position', [100, 100, 1200, 400]);

subplot(1, 2, 1);
plot(f_butter, 20*log10(abs(H_butter)+1e-10), 'b-', 'LineWidth', 2, 'DisplayName', 'IIR Butterworth (Order 5)');
hold on;
plot(f_fir_compare, 20*log10(abs(H_fir_compare)+1e-10), 'r-', 'LineWidth', 2, 'DisplayName', 'FIR (Order 100)');
hold off;
xlabel('Frequency (Hz)');
ylabel('Magnitude (dB)');
title('IIR vs FIR: Same Attenuation');
legend;
grid on;
ylim([-60, 5]);
xlim([0, 500]);

% Pole-zero plot (stability visualization)
subplot(1, 2, 2);
zplane(b_butter, a_butter);
title('Butterworth Pole-Zero Plot (poles inside unit circle = stable)');
grid on;
```

**Explanation**: `buttord` designs the minimum-order filter meeting specs. `butter` computes coefficients. Compare magnitude: IIR achieves the same rolloff with order 5, while FIR needs order >100. The trade-off: IIR is more efficient but non-linear phase and potentially unstable (poles must be inside unit circle). The pole-zero plot shows all poles safely inside.

### 6.5 Filtering Time-Domain Signals

Apply filters to real signals (not just frequency responses).

```matlab
clear all; clc;

% Signal with low and high frequency components
fs = 1000;
t = 0:1/fs:2;
low_freq = sin(2*pi*20*t);
high_freq = sin(2*pi*200*t);
x = low_freq + high_freq + 0.2*randn(size(t));

% Design low-pass filter
[b, a] = butter(4, 100/(fs/2));  % 4th order, 100 Hz cutoff

% Apply filter (forward pass)
y_filtered = filter(b, a, x);

% Zero-phase filtering (remove phase distortion)
y_zero_phase = filtfilt(b, a, x);

figure('Position', [100, 100, 1200, 600]);

% Original signal
subplot(3, 1, 1);
plot(t, x, 'b-', 'LineWidth', 0.5);
xlabel('Time (s)');
ylabel('Amplitude');
title('Original: 20 Hz + 200 Hz + Noise');
grid on;
xlim([0, 0.5]);

% Forward filter only
subplot(3, 1, 2);
plot(t, y_filtered, 'r-', 'LineWidth', 1);
xlabel('Time (s)');
ylabel('Amplitude');
title('Butterworth Filter (forward only)');
grid on;
xlim([0, 0.5]);

% Zero-phase filter (filtfilt)
subplot(3, 1, 3);
plot(t, y_zero_phase, 'g-', 'LineWidth', 1);
xlabel('Time (s)');
ylabel('Amplitude');
title('Zero-Phase Filter (filtfilt: forward-backward)');
grid on;
xlim([0, 0.5]);

% Frequency domain comparison
figure;
X_orig = fft(x);
Y_filtered = fft(y_filtered);
Y_zero = fft(y_zero_phase);
freq = (0:length(t)-1)*fs/length(t);

plot(freq(1:length(freq)/2), abs(X_orig(1:length(X_orig)/2)), 'b-', 'LineWidth', 1, 'DisplayName', 'Original');
hold on;
plot(freq(1:length(freq)/2), abs(Y_filtered(1:length(Y_filtered)/2)), 'r-', 'LineWidth', 1, 'DisplayName', 'Filtered');
plot(freq(1:length(freq)/2), abs(Y_zero(1:length(Y_zero)/2)), 'g-', 'LineWidth', 1, 'DisplayName', 'Zero-phase');
hold off;
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Frequency Domain: Effects of Filtering');
legend;
grid on;
xlim([0, 400]);
```

**Explanation**: `filter(b, a, x)` applies the IIR filter causally (output depends only on past/current inputs). `filtfilt` applies the filter twice—forward and backward—canceling phase distortion but losing causality. Choose `filter` for real-time systems, `filtfilt` for offline analysis. The high-frequency component (200 Hz) is attenuated, while 20 Hz passes through.

### 6.6 Advanced Filters: High-Pass, Band-Pass, Notch

```matlab
clear all; clc;

fs = 1000;
t = 0:1/fs:1;

% Prototype signal: mix of 50 Hz, 150 Hz, and 300 Hz
x = sin(2*pi*50*t) + sin(2*pi*150*t) + sin(2*pi*300*t) + 0.3*randn(size(t));

% Design different filters
[b_lp, a_lp] = butter(5, 120/(fs/2), 'low');      % Low-pass: < 120 Hz
[b_hp, a_hp] = butter(5, 120/(fs/2), 'high');     % High-pass: > 120 Hz
[b_bp, a_bp] = butter(5, [100, 200]/(fs/2), 'bandpass');  % Band-pass: 100–200 Hz

% 50 Hz notch filter (power-line interference)
Wo = 50/(fs/2);
BW = 5/(fs/2);  % Bandwidth: 5 Hz
[b_notch, a_notch] = iirnotch(Wo, BW);

figure('Position', [100, 100, 1200, 600]);

% Original spectrum
X_orig = abs(fft(x));
freq = (0:length(t)-1)*fs/length(t);

subplot(2, 3, 1);
semilogy(freq(1:length(freq)/2), X_orig(1:length(X_orig)/2), 'k-', 'LineWidth', 2);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Original: 50 + 150 + 300 Hz');
grid on;
xlim([0, 400]);

% Apply and plot each filter
filters = {b_lp, a_lp; b_hp, a_hp; b_bp, a_bp; b_notch, a_notch};
titles = {'Low-pass (< 120 Hz)', 'High-pass (> 120 Hz)', 'Band-pass (100–200 Hz)', 'Notch (50 Hz removed)'};

for idx = 1:4
    b = filters{idx, 1};
    a = filters{idx, 2};
    y = filter(b, a, x);
    Y = abs(fft(y));
    
    subplot(2, 3, idx + 1);
    semilogy(freq(1:length(freq)/2), Y(1:length(Y)/2), 'b-', 'LineWidth', 2);
    xlabel('Frequency (Hz)');
    ylabel('Magnitude');
    title(titles{idx});
    grid on;
    xlim([0, 400]);
    ylim([1, 1000]);
end

sgtitle('Filter Selectivity: Low-Pass, High-Pass, Band-Pass, Notch');
```

**Explanation**: Each filter type selects a band of frequencies. Low-pass removes high frequencies (noise, interference). High-pass removes DC and low-frequency drift. Band-pass isolates a specific frequency range. The notch filter is specialized: it removes a specific frequency (50 Hz power-line hum) while preserving adjacent frequencies. `iirnotch` creates a narrow, deep notch—essential in RF and biomedical applications.

### 6.7 Zero-Phase Filtering with filtfilt

For offline signal processing, `filtfilt` applies the filter forward and backward, achieving zero phase distortion.

```matlab
clear all; clc;

% Chirp signal (frequency increases with time)
fs = 1000;
t = 0:1/fs:1;
f_start = 10;
f_end = 200;
x = chirp(t, f_start, t(end), f_end);  % Frequency increases from 10 to 200 Hz

% Add noise
x_noisy = x + 0.3*randn(size(t));

% Design filter
[b, a] = butter(4, 100/(fs/2), 'low');

% Apply filter both ways
y_causal = filter(b, a, x_noisy);          % Causal (real-time)
y_zero_phase = filtfilt(b, a, x_noisy);    % Zero-phase (offline)

% Plot
figure('Position', [100, 100, 1200, 600]);

subplot(3, 1, 1);
plot(t, x, 'b-', 'LineWidth', 1.5, 'DisplayName', 'Clean chirp');
hold on;
plot(t, x_noisy, 'k-', 'LineWidth', 0.5, 'DisplayName', 'Noisy');
hold off;
xlabel('Time (s)');
ylabel('Amplitude');
title('Original Chirp Signal (10–200 Hz)');
legend;
grid on;
xlim([0, 1]);

subplot(3, 1, 2);
plot(t, y_causal, 'r-', 'LineWidth', 1);
xlabel('Time (s)');
ylabel('Amplitude');
title('Causal Filter: Distorts Phase');
grid on;
xlim([0, 1]);

subplot(3, 1, 3);
plot(t, y_zero_phase, 'g-', 'LineWidth', 1);
xlabel('Time (s)');
ylabel('Amplitude');
title('Zero-Phase Filter (filtfilt): No Phase Distortion');
grid on;
xlim([0, 1]);

% Check phase preservation by looking at instantaneous frequency
% The chirp should increase linearly; zero-phase preserves this
figure;
subplot(2, 1, 1);
plot(t, y_causal, 'r-', 'LineWidth', 1.5);
xlabel('Time (s)');
ylabel('Amplitude');
title('Causal: Notice slight delay in rising oscillations');
grid on;
xlim([0.4, 0.6]);

subplot(2, 1, 2);
plot(t, y_zero_phase, 'g-', 'LineWidth', 1.5);
xlabel('Time (s)');
ylabel('Amplitude');
title('Zero-Phase: Oscillations align with input');
grid on;
xlim([0.4, 0.6]);
```

**Explanation**: The chirp signal changes frequency over time. Causal filtering (real-time) introduces phase delay, shifting the oscillations. Zero-phase filtering applies the filter twice (forward and backward), canceling the phase distortion. Look at 0.4–0.6 seconds: the zero-phase version tracks the "clean" signal more accurately. Use `filtfilt` whenever phase preservation is critical (ECG, seismic, vibration analysis).

---

## PART 7: PRACTICAL MATLAB WORKFLOWS

### 7.1 Reading Data from Files

Real DSP work involves loading measured data, not synthetic signals.

```matlab
clear all; clc;

% Create a sample CSV file for demonstration
sample_data = [0:0.001:1; sin(2*pi*10*(0:0.001:1))]';
filename = 'sensor_data.csv';
writematrix(sample_data, filename);

% Method 1: readmatrix (modern, recommended)
data = readmatrix(filename);
time_col = data(:, 1);
signal_col = data(:, 2);

disp(['Loaded ', num2str(length(signal_col)), ' samples']);
disp(['Time range: ', num2str(time_col(1)), ' to ', num2str(time_col(end)), ' s']);

% Method 2: readtable (if file has headers)
writetable(table(time_col, signal_col, 'VariableNames', {'Time_s', 'Signal_V'}), 'sensor_data_headers.csv');
data_table = readtable('sensor_data_headers.csv');
signal_from_table = data_table.Signal_V;

% Method 3: Load MATLAB's native format (.mat files, very fast)
save('sensor_data.mat', 'time_col', 'signal_col');
load('sensor_data.mat');
disp('Loaded from .mat file');

% Plot loaded data
figure;
plot(time_col, signal_col, 'b-', 'LineWidth', 1.5);
xlabel('Time (s)');
ylabel('Signal (V)');
title('Loaded Data from File');
grid on;
xlim([0, 0.2]);

% Clean up
delete(filename);
delete('sensor_data_headers.csv');
delete('sensor_data.mat');
```

**Explanation**: `readmatrix` is the modern approach for CSV and Excel files. `readtable` preserves column names, useful for complex data. `.mat` files are MATLAB's native format—much faster for large data or multiple variables. Always verify loaded data with `whos` and plots before processing.

### 7.2 Processing and Saving Results

```matlab
clear all; clc;

% Simulate acquired signal from ADC (10-bit resolution, 0–3.3V)
fs = 8000;
duration = 5;
t = 0:1/fs:duration-1/fs;

% Realistic signal: 440 Hz tone (music), environmental noise
tone = sin(2*pi*440*t);
noise = 0.3*randn(size(t));
x = tone + noise;

% ADC quantization (10-bit: values 0–1023, mapped to 0–3.3V)
adc_resolution = 10;
v_ref = 3.3;
adc_max = 2^adc_resolution - 1;
adc_counts = round((x + 1)/2 * adc_max);  % Map [-1, 1] to [0, 1023]
adc_voltage = adc_counts / adc_max * v_ref;  % Back to voltage

% DSP processing
[b, a] = butter(4, 100/(fs/2), 'low');
x_filtered = filtfilt(b, a, adc_voltage);

% Compute statistics
rms_value = rms(x_filtered);  % RMS (root-mean-square)
peak_value = max(abs(x_filtered));
[pxx, freq] = periodogram(x_filtered, [], [], fs);

disp('=== Processing Summary ===');
disp(['RMS Voltage: ', num2str(rms_value, 3), ' V']);
disp(['Peak Voltage: ', num2str(peak_value, 3), ' V']);
disp(['SNR (rough estimate): ', num2str(rms_value/0.3, 2), ' (tone vs noise)']);

% Save results
results = struct();
results.fs = fs;
results.time = t;
results.raw_voltage = adc_voltage;
results.filtered_voltage = x_filtered;
results.rms = rms_value;
results.peak = peak_value;

save('dsp_results.mat', 'results');
disp('Results saved to dsp_results.mat');

% Export to CSV for external analysis
output_table = table(t', adc_voltage', x_filtered', ...
    'VariableNames', {'Time_s', 'ADC_Voltage_V', 'Filtered_Voltage_V'});
writetable(output_table, 'dsp_results.csv');
disp('Results exported to dsp_results.csv');

% Cleanup
delete('dsp_results.mat');
delete('dsp_results.csv');
```

**Explanation**: This workflow simulates ADC data (quantized to 10-bit), processes it, and saves results. `rms` computes root-mean-square (energy metric). `periodogram` analyzes spectral content. Results are saved as MATLAB struct for fast reload or CSV for sharing with other tools. This mirrors real instrument pipelines: ADC → filter → analysis → save.

### 7.3 Serial Communication with Microcontrollers

Real-world DSP often connects MATLAB to embedded systems (ESP32, microcontroller boards).

```matlab
% NOTE: Requires Instrument Control Toolbox (serialport function)
% This is pseudo-code showing the workflow

function [data_received] = read_from_mcu(comport, baud, n_samples)
    % Open serial port
    s = serialport(comport, baud);
    configureTerminator(s, "CR/LF");
    
    % Send command to MCU
    writeline(s, "START_ADC");  % Tells MCU to start collecting
    
    % Read samples
    data_received = [];
    for i = 1:n_samples
        if s.NumBytesAvailable > 0
            line = readline(s);
            value = str2double(line);
            data_received = [data_received; value];
        else
            pause(0.001);  % Wait for data
        end
    end
    
    % Close port
    clear s;
end

% Example usage (pseudocode—requires actual MCU):
% data = read_from_mcu("COM3", 115200, 8000);
% filtered_data = filter(b, a, data);
% plot(filtered_data);
```

**Explanation**: This template reads ADC data from a microcontroller over serial (e.g., UART on ESP32). The MCU sends ASCII lines (e.g., "2048\n" for a 12-bit ADC value). MATLAB reads, converts to numeric, and processes. For RF applications, this connects your RF sensors to MATLAB for real-time analysis.

### 7.4 Real-Time Plotting (Streaming Data)

For DSP monitoring, update plots dynamically as data arrives.

```matlab
clear all; clc;

% Simulate streaming ADC data
fs = 1000;
duration = 5;
total_samples = fs * duration;
chunk_size = 100;  % Process 100 samples at a time (100 ms)

% Pre-allocate and setup
x_total = sin(2*pi*10*(0:total_samples-1)/fs) + 0.5*randn(1, total_samples);
figure('Position', [100, 100, 1200, 500]);

% Initialize plot
h = plot(nan, nan, 'b-', 'LineWidth', 1.5);
xlabel('Sample Index');
ylabel('Amplitude');
title('Real-Time Signal Display');
grid on;
ylim([-3, 3]);
xlim([0, chunk_size*10]);

% Streaming loop
data_buffer = [];
tic;
for chunk_idx = 1:10
    % Simulate new data arrival
    new_chunk = x_total((chunk_idx-1)*chunk_size + 1 : chunk_idx*chunk_size);
    data_buffer = [data_buffer, new_chunk];
    
    % Update plot
    set(h, 'XData', 1:length(data_buffer), 'YData', data_buffer);
    xlim([max(1, length(data_buffer)-500), length(data_buffer)+50]);
    
    % Force redraw
    drawnow;
    
    % Simulate processing delay
    pause(0.1);
end
elapsed = toc;

disp(['Processed ', num2str(length(data_buffer)), ' samples in ', num2str(elapsed, 2), ' seconds']);
```

**Explanation**: The streaming loop receives data in chunks, appends to a buffer, and updates the plot. `drawnow` forces MATLAB to redraw (otherwise it buffers plot commands). This pattern is essential for real-time monitoring of RF measurements, vibration analysis, or audio processing.

---

## PART 8: PROFESSIONAL PRACTICES

### 8.1 Folder Structure for DSP Projects

Organize your MATLAB DSP work like professional engineers:

```
RF_DSP_Project/
├── data/
│   ├── raw/              % Raw ADC/sensor files
│   ├── processed/        % Filtered, analyzed results
│   └── references/       % Spec sheets, calibration data
├── scripts/
│   ├── main_analysis.m   % Top-level script
│   ├── helper_functions/
│   │   ├── load_adc_data.m
│   │   ├── design_filters.m
│   │   └── compute_spectra.m
│   └── tests/            % Unit tests for functions
├── results/
│   ├── plots/            % Generated figures
│   └── reports/          % Summary documents
└── docs/
    ├── README.md         % Project overview
    └── methodology.txt   % Filter specs, design choices
```

### 8.2 Script Naming and Documentation

```matlab
% Filename: compute_rms_and_thd.m
% Purpose: Calculate RMS voltage and Total Harmonic Distortion (THD)
% Author: Your Name
% Date: Jan 2026
% Last Modified: Jan 16, 2026
%
% Inputs:
%   signal (vector): Sampled voltage waveform
%   fs (scalar): Sampling frequency in Hz
%
% Outputs:
%   rms_value (scalar): RMS voltage
%   thd_percent (scalar): THD as percentage
%   harmonic_magnitudes (vector): Magnitude of harmonics
%
% Example:
%   [rms, thd, harmonics] = compute_rms_and_thd(signal, 8000);

function [rms_value, thd_percent, harmonic_magnitudes] = compute_rms_and_thd(signal, fs)
    
    % Input validation
    if length(signal) < 100
        warning('Signal very short; THD calculation may be inaccurate');
    end
    
    % Compute RMS
    rms_value = sqrt(mean(signal.^2));
    
    % Compute FFT
    X = fft(signal);
    freq = (0:length(signal)-1) * fs / length(signal);
    magnitude = 2*abs(X(1:length(X)/2)) / length(signal);
    
    % Find fundamental and harmonics
    % Assume fundamental at the first significant peak
    [~, f1_idx] = max(magnitude(2:end));  % Skip DC
    f1_idx = f1_idx + 1;
    
    % Extract harmonic magnitudes (up to 10th harmonic)
    harmonic_magnitudes = zeros(10, 1);
    for k = 1:10
        target_freq = k * freq(f1_idx);
        [~, idx] = min(abs(freq - target_freq));
        if idx <= length(magnitude)
            harmonic_magnitudes(k) = magnitude(idx);
        end
    end
    
    % Compute THD
    fundamental = harmonic_magnitudes(1);
    higher_harmonics = harmonic_magnitudes(2:end);
    thd_percent = 100 * sqrt(sum(higher_harmonics.^2)) / fundamental;
end
```

**Explanation**: Every function needs a header comment describing purpose, inputs, outputs, and example usage. Input validation prevents silent errors. This style is industry-standard and helps collaborators (and future you) understand the code instantly.

### 8.3 Common Beginner Errors (Recap + Solutions)

```matlab
% ERROR 1: Forgetting element-wise operations
x = [1, 2, 3];
y = x ^ 2;  % ERROR: Non-square matrix to a power

% SOLUTION: Use .^
y = x .^ 2;  % [1, 4, 9]

% ERROR 2: Dimension mismatch in concatenation
a = [1, 2, 3];  % Row vector (1×3)
b = [4; 5; 6];  % Column vector (3×1)
c = [a; b];     % ERROR: Dimension mismatch

% SOLUTION: Ensure matching dimensions
c = [a, b'];    % Row concatenation
% or
c = [a'; b];    % Column concatenation

% ERROR 3: Index out of bounds
signal = [10, 20, 30];
value = signal(4);  % ERROR: Only 3 elements

% SOLUTION: Check array length first
if length(signal) >= 4
    value = signal(4);
else
    value = signal(end);
end

% ERROR 4: NaN or Inf propagation
x = [1, 2, 0];
result = log(x./x);  % x/x = [1, 1, NaN], log gives NaN

% SOLUTION: Check for invalid operations
safe_result = zeros(size(x));
for n = 1:length(x)
    if x(n) ~= 0
        safe_result(n) = log(x(n)/x(n));
    end
end

% ERROR 5: Forget to check filter stability
b = [1, 2, 3];
a = [1, 0.5, -1.5];  % Feedback coefficient -1.5 → unstable

% SOLUTION: Check pole locations
poles = roots(a);
if any(abs(poles) >= 1)
    warning('Filter is unstable!');
end
```

### 8.4 Debugging Techniques

```matlab
% Technique 1: Use disp and num2str for intermediate inspection
signal = sin(2*pi*100*(0:99)/1000);
disp(['Signal length: ', num2str(length(signal))]);
disp(['Signal range: [', num2str(min(signal)), ', ', num2str(max(signal)), ']']);

% Technique 2: Use assert for conditions that must hold
filtered = filter([1, 2], [1], signal);
assert(length(filtered) == length(signal), 'Filtered signal length mismatch');

% Technique 3: Temporary plots for inspection
figure;
plot(signal, 'b-'); title('Checkpoint 1: Raw Signal');
figure;
plot(filtered, 'r-'); title('Checkpoint 2: Filtered');

% Technique 4: Save intermediate results
save('debug_checkpoint.mat', 'signal', 'filtered');
% Later, load('debug_checkpoint.mat') to inspect

% Technique 5: Use try-catch for error handling
try
    X = fft(signal);
catch ME
    disp(['Error during FFT: ', ME.message]);
    return;  % Exit function gracefully
end
```

### 8.5 MATLAB as a DSP Laboratory

Think of MATLAB not as a programming language but as a digital oscilloscope, spectrum analyzer, and signal generator combined:

| Instrument | MATLAB Equivalent | Function |
|------------|-------------------|----------|
| Oscilloscope | `plot(t, signal)` | View waveforms |
| Spectrum Analyzer | `periodogram(x, [], [], fs)` | Frequency analysis |
| Function Generator | `sin(2*pi*f*t)`, `chirp(t, ...)` | Create test signals |
| Filter Designer | `butter`, `fir1` | Design filters |
| Digital Multimeter | `rms(signal)`, `max(abs(signal))` | Measure signal properties |
| Lock-in Amplifier | `filter`, `pwelch` | Extract signals at specific frequencies |

Use this mindset: "What measurement would I make in the lab?" Then translate to MATLAB code.

---

## APPENDIX: QUICK REFERENCE COMMANDS

### Signal Generation
```matlab
t = 0:1/fs:duration-1/fs;           % Time vector
x = A*sin(2*pi*f*t + phase);        % Sine wave
x = A*cos(2*pi*f*t + phase);        % Cosine wave
x = A*exp(-decay*t).*sin(2*pi*f*t); % Damped sinusoid
x = chirp(t, f1, t_end, f2);        % Frequency sweep
x = randn(size(t));                 % White Gaussian noise
```

### Plotting
```matlab
plot(t, x);                         % Continuous time signal
stem(n, x);                         % Discrete-time signal
subplot(rows, cols, index);         % Create subplot
hold on; hold off;                  % Overlay plots
legend, xlabel, ylabel, title, grid; % Labels
```

### Filtering
```matlab
[b, a] = butter(order, Wn);        % Butterworth design
[b, a] = cheby1(order, Rp, Wn);    % Chebyshev Type I
b = fir1(order, Wn);               % FIR design
y = filter(b, a, x);               % Apply filter (causal)
y = filtfilt(b, a, x);             % Zero-phase filter
```

### Frequency Analysis
```matlab
X = fft(x);                        % Fast Fourier Transform
[Pxx, f] = periodogram(x, [], [], fs);  % Power spectral density
[H, f] = freqz(b, a, [], fs);      % Frequency response
```

### Statistics
```matlab
rms(x);                            % RMS value
mean(x);                           % Mean
std(x);                            % Standard deviation
max(x), min(x);                    % Maximum, minimum
```

---

## Final Notes

This guide presents MATLAB as a **DSP laboratory**. Every concept has a practical code implementation. As an RF engineering student, you'll apply these tools to:
- Characterize circuits (measure S-parameters, impedance)
- Process sensor data (temperature, signal strength)
- Design and test filters for RF applications
- Analyze modulated signals
- Implement real-time signal processing on microcontrollers

Master these fundamentals, and MATLAB becomes your invisible collaborator in every measurement and design you undertake.

