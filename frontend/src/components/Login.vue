<template>
	<div class="p-6 max-w-md mx-auto">
		<h2 class="text-2xl font-bold mb-4">Login</h2>
		<form @submit.prevent="handleLogin">
			<input type="email" v-model="email" placeholder="Email" class="input" />
			<input
				type="password"
				v-model="password"
				placeholder="Password"
				class="input"
			/>
			<button class="btn mt-4" type="submit">Login</button>
			<p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
			<p v-if="success" class="text-green-600 mt-2">{{ success }}</p>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const error = ref("");
const success = ref("");

async function handleLogin() {
	error.value = "";
	success.value = "";

	try {
		const response = await fetch("http://localhost:3000/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email.value,
				password: password.value,
			}),
		});

		const result = await response.json();

		if (response.ok && result.success) {
			success.value = "Login successful!";
		} else {
			error.value = result.message || "Login failed.";
		}
	} catch (err) {
		error.value = "Error connecting to server.";
	}
}
</script>

<style scoped>
.input {
	display: block;
	width: 100%;
	margin-bottom: 1rem;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 0.5rem;
}
.btn {
	background: #4f46e5;
	color: white;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
}
</style>
