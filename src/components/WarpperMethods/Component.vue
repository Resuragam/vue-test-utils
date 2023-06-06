<template>
	<div id="foo" :class="className">
		<div ref="son">DIV</div>
		<section ref="section" v-show="true">
			<section></section>
		</section>
		<span v-for="number in [1, 2, 3]" :key="number">
			{{ number }}
		</span>
		<Foo v-for="number in [1, 2, 3]" :key="number" class="foo"></Foo>
	</div>
</template>
<script>
	import Foo from "./Foo.vue";
	export default {
		data() {
			return {
				className: "bar",
			};
		},
		components: {
			Foo,
		},
		created() {
			this.$emit("greet", "hello");
			this.$emit("greet", "goodbye");
		},
	};
</script>
