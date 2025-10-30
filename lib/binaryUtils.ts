// lib/binaryUtils.ts
export function textToBinary(text: string): string {
    return text
      .split("")
      .map((char) =>
        char.charCodeAt(0).toString(2).padStart(8, "0")
      )
      .join(" ");
}

// lib/binaryUtils.ts
export function toBinary(num: number, bits = 8): string {
    if (num >= 0) {
      return num.toString(2).padStart(bits, "0");
    }
  
    // For negative numbers: 2's complement
    const twosComp = (1 << bits) + num; // e.g., 8-bit: 256 + (-6) = 250
    return twosComp.toString(2).padStart(bits, "0");
}
  
export function explainTwosComplement(num: number, bits = 8): string[] {
    if (num >= 0) {
      return [
        `${num} is positive, so directly convert to binary.`,
        `${num} = ${toBinary(num, bits)}`
      ];
    }
  
    const abs = Math.abs(num);
    const step1 = abs.toString(2).padStart(bits, "0");
    const step2 = step1.replace(/[01]/g, (b) => (b === "0" ? "1" : "0"));
    const step3 = (parseInt(step2, 2) + 1).toString(2).padStart(bits, "0");
  
    return [
      `${num} is negative, so we find 2's complement of ${abs}.`,
      `1️⃣ Write ${abs} in binary: ${step1}`,
      `2️⃣ Invert bits: ${step2}`,
      `3️⃣ Add 1: ${step3}`,
      `✅ Final 2’s complement for ${num}: ${step3}`
    ];
}
  