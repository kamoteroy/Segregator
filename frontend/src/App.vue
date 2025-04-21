<template>
	<div class="flex items-center justify-center min-h-screen bg-green-100">
		<div class="p-4 rounded-lg shadow-md bg-white">
			<!-- Detection Section -->
			<div
				class="text-center mb-6 border-1 bg-gray-300 border-black-500 p-4 rounded-lg"
			>
				<label class="block font-semibold text-lg">Detection:</label>
				<h2 class="mt-2 text-2xl font-bold">{{ getLastValueLabel }}</h2>
			</div>

			<!-- Bin Gauges -->
			<div class="bin-values flex justify-center gap-10 flex-wrap">
				<!-- Bin 1 -->
				<div class="bin-gauge flex flex-col items-center mb-6">
					<div class="led-container flex justify-center gap-2 mt-2">
						<div class="led-item flex items-center gap-2 text-sm">
							<div class="led" :class="{ active: lastValue === 1 }"></div>
						</div>
						<div class="led-item flex items-center gap-2 text-sm">
							<div
								class="led red"
								:class="{ active: bin1Percent === 100 }"
								:style="{
									backgroundColor: bin1Percent === 100 ? '#dc3545' : '#ccc',
								}"
							></div>
						</div>
					</div>

					<!-- Bin Gauge -->
					<svg viewBox="0 0 100 50" class="gauge w-full max-w-[200px] h-auto">
						<path
							class="gauge-bg fill-none stroke-[#eee] stroke-[10]"
							d="M 10 50 A 40 40 0 0 1 90 50"
						/>
						<path
							class="gauge-fill fill-none stroke-width-10 transition-all ease-in-out"
							:stroke="bin1Color"
							:stroke-dasharray="bin1Arc + ', 125.6'"
							d="M 10 50 A 40 40 0 0 1 90 50"
						/>
						<text
							x="50"
							y="40"
							text-anchor="middle"
							class="gauge-text text-sm font-bold fill-[#333]"
						>
							{{ bin1Percent }}%
						</text>
					</svg>
					<div class="bin-label mt-2 text-sm font-semibold text-center">
						General Waste:
					</div>
				</div>

				<!-- Bin 2 -->
				<div class="bin-gauge flex flex-col items-center w-32 mb-6">
					<div class="led-container flex justify-center gap-2 mt-2">
						<div class="led-item flex items-center gap-2 text-sm">
							<div class="led" :class="{ active: lastValue === 2 }"></div>
						</div>
						<div class="led-item flex items-center gap-2 text-sm">
							<div
								class="led red"
								:class="{ active: bin2Percent === 100 }"
								:style="{
									backgroundColor: bin2Percent === 100 ? '#dc3545' : '#ccc',
								}"
							></div>
						</div>
					</div>

					<!-- Bin Gauge -->
					<svg viewBox="0 0 100 50" class="gauge w-full max-w-[200px] h-auto">
						<path
							class="gauge-bg fill-none stroke-[#eee] stroke-[10]"
							d="M 10 50 A 40 40 0 0 1 90 50"
						/>
						<path
							class="gauge-fill fill-none stroke-width-10 transition-all ease-in-out"
							:stroke="bin2Color"
							:stroke-dasharray="bin2Arc + ', 125.6'"
							d="M 10 50 A 40 40 0 0 1 90 50"
						/>
						<text
							x="50"
							y="40"
							text-anchor="middle"
							class="gauge-text text-sm font-bold fill-[#333]"
						>
							{{ bin2Percent }}%
						</text>
					</svg>
					<div class="bin-label mt-2 text-sm font-semibold text-center">
						E Waste:
					</div>
				</div>
			</div>

			<!-- Hidden Audio Element for Buzzer -->
			<audio ref="buzzerAudio" src="/beep.mp3" preload="auto"></audio>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gzjxxpeofotelxrzblez.supabase.co";
const SUPABASE_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6anh4cGVvZm90ZWx4cnpibGV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDEwODEsImV4cCI6MjA1MjY3NzA4MX0.R_tCibbHI78B0JYvIja4aNam3tltG3M-eDnmQKn15Cg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const lastValue = ref(null);
const bin1Value = ref(0);
const bin2Value = ref(0);
const buzzerAudio = ref(null);
const notificationPermission = ref("default");

let resetTimeout = null;

const maxBinValue = 100;

const getLastValueLabel = computed(() => {
	if (lastValue.value === 1) return "General Waste";
	if (lastValue.value === 2) return "E Waste";
	return "Waiting...";
});

const bin1Percent = computed(() => {
	return Math.min(100, Math.round((bin1Value.value / maxBinValue) * 100));
});

const bin2Percent = computed(() => {
	return Math.min(100, Math.round((bin2Value.value / maxBinValue) * 100));
});

const bin1Arc = computed(() => ((bin1Percent.value / 100) * 125.6).toFixed(1));
const bin2Arc = computed(() => ((bin2Percent.value / 100) * 125.6).toFixed(1));

// Color based on percentage
const bin1Color = computed(() => {
	if (bin1Percent.value < 50) return "#28a745"; // Green
	if (bin1Percent.value < 80) return "#ffc107"; // Orange
	return "#dc3545"; // Red
});

const bin2Color = computed(() => {
	if (bin2Percent.value < 50) return "#28a745"; // Green
	if (bin2Percent.value < 80) return "#ffc107"; // Orange
	return "#dc3545"; // Red
});

function requestNotificationPermission() {
	if ("Notification" in window) {
		Notification.requestPermission().then((perm) => {
			notificationPermission.value = perm;
		});
	}
}

function showNativeNotification(message) {
	if ("Notification" in window && notificationPermission.value === "granted") {
		new Notification("Bin Alert", {
			body: message,
			icon: "/bin-icon.png", // optional icon
		});
	}
}

watch([bin1Percent, bin2Percent], ([bin1, bin2]) => {
	if (buzzerAudio.value && (bin1 === 100 || bin2 === 100)) {
		buzzerAudio.value.play().catch((err) => {
			console.warn("Audio play failed:", err);
		});
	}

	if (bin1 === 100 && bin2 === 100) {
		showNativeNotification("Both bins are full!");
	} else if (bin1 === 100) {
		showNativeNotification("General Waste bin is full!");
	} else if (bin2 === 100) {
		showNativeNotification("E Waste bin is full!");
	}
});

onMounted(async () => {
	requestNotificationPermission();

	const { data: bin1Data, error: bin1Error } = await supabase
		.from("binValues")
		.select("value")
		.eq("bin_id", 1)
		.order("created_at", { ascending: false })
		.limit(1)
		.single();

	if (!bin1Error) bin1Value.value = bin1Data.value;

	const { data: bin2Data, error: bin2Error } = await supabase
		.from("binValues")
		.select("value")
		.eq("bin_id", 2)
		.order("created_at", { ascending: false })
		.limit(1)
		.single();

	if (!bin2Error) bin2Value.value = bin2Data.value;

	supabase
		.channel("realtime:public:binValues")
		.on(
			"postgres_changes",
			{ event: "INSERT", schema: "public", table: "binValues" },
			async (payload) => {
				if (payload.new.bin_id === 1) {
					bin1Value.value = payload.new.value;
				} else if (payload.new.bin_id === 2) {
					bin2Value.value = payload.new.value;
				}
			}
		)
		.subscribe();

	supabase
		.channel("realtime:public:clicks")
		.on(
			"postgres_changes",
			{ event: "INSERT", schema: "public", table: "clicks" },
			(payload) => {
				lastValue.value = payload.new.value;

				if (resetTimeout) clearTimeout(resetTimeout);

				resetTimeout = setTimeout(() => {
					lastValue.value = null;
				}, 5000);
			}
		)
		.subscribe();
});
</script>

<style>
.led-container {
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-top: 10px;
}

.led-item {
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 16px;
}

.led {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: #d1e7fd; /* Soft light blue for inactive blue LED */
	box-shadow: 0 0 6px rgba(0, 0, 255, 0.2); /* Light shadow for inactive state */
	transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.led.active {
	background-color: #007bff; /* Bright blue when active */
	box-shadow: 0 0 10px rgba(0, 123, 255, 1); /* Brighter glow when active */
	transform: scale(1.2); /* Slightly enlarge the LED when active */
}

.led.red {
	background-color: #dc3545; /* Soft light red for inactive red LED */
	box-shadow: 0 0 6px rgba(255, 0, 0, 0.2); /* Light shadow for inactive state */
}

.led.red.active {
	background-color: #dc3545; /* Bright red when active */
	box-shadow: 0 0 10px rgba(220, 53, 69, 1); /* Brighter glow when active */
	transform: scale(1.2); /* Slightly enlarge the LED when active */
}

.bin-values {
	display: flex;
	justify-content: center;
	gap: 40px;
	margin-top: 30px;
	flex-wrap: wrap;
	padding: 0 10px;
}

.bin-gauge {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 120px;
	margin-bottom: 20px;
}

.gauge {
	width: 100%;
	max-width: 200px;
	height: auto;
}

.gauge-bg {
	fill: none;
	stroke: #eee;
	stroke-width: 10;
}

.gauge-fill {
	fill: none;
	stroke-width: 10;
	transition: stroke-dasharray 0.5s ease, stroke 0.5s ease;
}

.gauge-text {
	font-size: 14px;
	fill: #333;
	font-weight: bold;
}

.bin-label {
	margin-top: 8px;
	font-size: 16px;
	font-weight: 600;
	text-align: center;
}
</style>
