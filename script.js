let currentStep = 1;
        const totalSteps = 4;

        // SVGs
        const checkIcon = `<svg class="h-4 w-4 text-black" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`;
        const activeDot = `<div class="h-3 w-3 rounded-full bg-slate-900"></div>`;

        function isStepValid(step) {
            if (step === 4) {
                return document.getElementById('confirm').checked;
            }
            // Checks if any radio button in the current step group is checked
            const radios = document.getElementsByName(`step${step}`);
            return Array.from(radios).some(r => r.checked);
        }

        function updateUI() {
            // Update Visibility
            document.querySelectorAll('.step-content').forEach((el, idx) => {
                el.classList.toggle('active', currentStep === (idx + 1));
            });

            if (currentStep > totalSteps) {
                document.getElementById('step-content-final').classList.add('active');
                document.getElementById('footer').classList.add('hidden');
                return;
            }

            // Update Indicators & Lines
            for (let i = 1; i <= totalSteps; i++) {
                const circle = document.getElementById(`circle-${i}`);
                const line = document.getElementById(`line-${i}`);

                if (i < currentStep) {
                    circle.innerHTML = checkIcon;
                    circle.className = "flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f3ff]";
                    if (line) line.style.width = "100%";
                } else if (i === currentStep) {
                    circle.innerHTML = activeDot;
                    circle.className = "flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f3ff]";
                    if (line) line.style.width = "0%";
                } else {
                    circle.innerHTML = `<span class="text-sm">${i}</span>`;
                    circle.className = "flex h-8 w-8 items-center justify-center rounded-full bg-[#222] text-[#a3a3a3]";
                    if (line) line.style.width = "0%";
                }
            }

            // Update Buttons
            document.getElementById('back-btn').classList.toggle('invisible', currentStep === 1);
            document.getElementById('next-btn').innerText = (currentStep === totalSteps) ? "Complete" : "Continue";
            document.getElementById('error-box').classList.add('hidden');
        }

        function handleNext() {
            if (isStepValid(currentStep)) {
                currentStep++;
                updateUI();
            } else {
                document.getElementById('error-box').classList.remove('hidden');
            }
        }

        function handleBack() {
            if (currentStep > 1) {
                currentStep--;
                updateUI();
            }
        }

        function goToStep(target) {
            if (target < currentStep) {
                currentStep = target;
                updateUI();
            } 
            // If going forwards, validate every step in between.
            else if (target > currentStep) {
                for (let i = currentStep; i < target; i++) {
                    if (!isStepValid(i)) {
                        document.getElementById('error-box').classList.remove('hidden');
                        return; // Stop here, validation failed for step i
                    }
                }
                currentStep = target;
                updateUI();
            }
        }

        updateUI();