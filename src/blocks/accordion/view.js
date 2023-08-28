/**
 * Accordion Block
 */
document.addEventListener("click", function (e) {
	const target = e.target;

	if (target && target !== document) {
		const accordion = target.closest(".wp-block-sf-accordion");
		const activeH = accordion.querySelector(".accordion-head");
		const activeB = accordion.querySelector(".accordion-body");

		if (target.closest(".accordion-body")) {
			return;
		}

		activeH.classList.toggle("is-active");
		activeB.classList.toggle("is-active");
		if (activeB.classList.contains("is-active")) {
			activeB.setAttribute("aria-expanded", true);
			activeB.style.height = activeB.scrollHeight + "px";
		} else {
			activeB.setAttribute("aria-expanded", false);
			activeB.style.height = "0px";
		}
	}
});
