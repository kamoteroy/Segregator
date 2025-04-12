import { ref, onMounted, computed } from "vue";
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://gzjxxpeofotelxrzblez.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6anh4cGVvZm90ZWx4cnpibGV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDEwODEsImV4cCI6MjA1MjY3NzA4MX0.R_tCibbHI78B0JYvIja4aNam3tltG3M-eDnmQKn15Cg";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const lastValue = ref(null);
const bin1Value = ref(0);
const bin2Value = ref(0);
const maxBinValue = 100;
const getLastValueLabel = computed(() => {
    if (lastValue.value === 1)
        return "General Waste";
    if (lastValue.value === 2)
        return "E Waste";
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
    if (bin1Percent.value < 50)
        return "#28a745"; // Green
    if (bin1Percent.value < 80)
        return "#ffc107"; // Orange
    return "#dc3545"; // Red
});
const bin2Color = computed(() => {
    if (bin2Percent.value < 50)
        return "#28a745"; // Green
    if (bin2Percent.value < 80)
        return "#ffc107"; // Orange
    return "#dc3545"; // Red
});
onMounted(async () => {
    // Fetch latest value for Bin 1
    const { data: bin1Data, error: bin1Error } = await supabase
        .from("binValues")
        .select("value")
        .eq("bin_id", 1)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
    if (bin1Error) {
        console.error("Error fetching bin 1 value:", bin1Error);
    }
    else {
        bin1Value.value = bin1Data.value;
    }
    // Fetch latest value for Bin 2
    const { data: bin2Data, error: bin2Error } = await supabase
        .from("binValues")
        .select("value")
        .eq("bin_id", 2)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
    if (bin2Error) {
        console.error("Error fetching bin 2 value:", bin2Error);
    }
    else {
        bin2Value.value = bin2Data.value;
    }
    // Clicks subscription
    supabase
        .channel("realtime:public:clicks")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "clicks" }, (payload) => {
        lastValue.value = payload.new.value;
    })
        .subscribe();
    // Bin values subscription
    supabase
        .channel("realtime:public:binValues")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "binValues" }, (payload) => {
        if (payload.new.bin_id === 1) {
            bin1Value.value = payload.new.value;
        }
        else if (payload.new.bin_id === 2) {
            bin2Value.value = payload.new.value;
        }
    })
        .subscribe();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['led']} */ ;
/** @type {__VLS_StyleScopedClasses['led']} */ ;
/** @type {__VLS_StyleScopedClasses['led']} */ ;
/** @type {__VLS_StyleScopedClasses['red']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center justify-center min-h-screen bg-green-100" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "p-4 rounded-lg shadow-md bg-white" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-center mb-6 border-1 bg-gray-300 border-black-500 p-4 rounded-lg" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "block font-semibold text-lg" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "mt-2 text-2xl font-bold" },
});
(__VLS_ctx.getLastValueLabel);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bin-values flex justify-center gap-10 flex-wrap" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bin-gauge flex flex-col items-center mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "led-container flex justify-center gap-2 mt-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "led-item flex items-center gap-2 text-sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "led" },
    ...{ class: ({ active: __VLS_ctx.lastValue === 1 }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "led-item flex items-center gap-2 text-sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "led red" },
    ...{ class: ({ active: __VLS_ctx.bin1Percent === 100 }) },
    ...{ style: ({
            backgroundColor: __VLS_ctx.bin1Percent === 100 ? '#dc3545' : '#ccc',
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    viewBox: "0 0 100 50",
    ...{ class: "gauge w-full max-w-[200px] h-auto" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    ...{ class: "gauge-bg fill-none stroke-[#eee] stroke-[10]" },
    d: "M 10 50 A 40 40 0 0 1 90 50",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    ...{ class: "gauge-fill fill-none stroke-width-10 transition-all ease-in-out" },
    stroke: (__VLS_ctx.bin1Color),
    'stroke-dasharray': (__VLS_ctx.bin1Arc + ', 125.6'),
    d: "M 10 50 A 40 40 0 0 1 90 50",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
    x: "50",
    y: "40",
    'text-anchor': "middle",
    ...{ class: "gauge-text text-sm font-bold fill-[#333]" },
});
(__VLS_ctx.bin1Percent);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bin-label mt-2 text-sm font-semibold text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bin-gauge flex flex-col items-center w-32 mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "led-container flex justify-center gap-2 mt-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "led-item flex items-center gap-2 text-sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "led" },
    ...{ class: ({ active: __VLS_ctx.lastValue === 2 }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "led-item flex items-center gap-2 text-sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "led red" },
    ...{ class: ({ active: __VLS_ctx.bin2Percent === 100 }) },
    ...{ style: ({
            backgroundColor: __VLS_ctx.bin2Percent === 100 ? '#dc3545' : '#ccc',
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    viewBox: "0 0 100 50",
    ...{ class: "gauge w-full max-w-[200px] h-auto" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    ...{ class: "gauge-bg fill-none stroke-[#eee] stroke-[10]" },
    d: "M 10 50 A 40 40 0 0 1 90 50",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    ...{ class: "gauge-fill fill-none stroke-width-10 transition-all ease-in-out" },
    stroke: (__VLS_ctx.bin2Color),
    'stroke-dasharray': (__VLS_ctx.bin2Arc + ', 125.6'),
    d: "M 10 50 A 40 40 0 0 1 90 50",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
    x: "50",
    y: "40",
    'text-anchor': "middle",
    ...{ class: "gauge-text text-sm font-bold fill-[#333]" },
});
(__VLS_ctx.bin2Percent);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bin-label mt-2 text-sm font-semibold text-center" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['border-black-500']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['bin-values']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-10']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['bin-gauge']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['led-container']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['led-item']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['led']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['led-item']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['led']} */ ;
/** @type {__VLS_StyleScopedClasses['red']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['gauge']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['gauge-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-none']} */ ;
/** @type {__VLS_StyleScopedClasses['stroke-[#eee]']} */ ;
/** @type {__VLS_StyleScopedClasses['stroke-[10]']} */ ;
/** @type {__VLS_StyleScopedClasses['gauge-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-none']} */ ;
/** @type {__VLS_StyleScopedClasses['stroke-width-10']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['gauge-text']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-[#333]']} */ ;
/** @type {__VLS_StyleScopedClasses['bin-label']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bin-gauge']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['led-container']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['led-item']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['led']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['led-item']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['led']} */ ;
/** @type {__VLS_StyleScopedClasses['red']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['gauge']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['gauge-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-none']} */ ;
/** @type {__VLS_StyleScopedClasses['stroke-[#eee]']} */ ;
/** @type {__VLS_StyleScopedClasses['stroke-[10]']} */ ;
/** @type {__VLS_StyleScopedClasses['gauge-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-none']} */ ;
/** @type {__VLS_StyleScopedClasses['stroke-width-10']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['gauge-text']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-[#333]']} */ ;
/** @type {__VLS_StyleScopedClasses['bin-label']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            lastValue: lastValue,
            getLastValueLabel: getLastValueLabel,
            bin1Percent: bin1Percent,
            bin2Percent: bin2Percent,
            bin1Arc: bin1Arc,
            bin2Arc: bin2Arc,
            bin1Color: bin1Color,
            bin2Color: bin2Color,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
