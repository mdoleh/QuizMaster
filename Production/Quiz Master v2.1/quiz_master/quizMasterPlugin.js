(function ($, quizService) {
    $.fn.quizMaster = function () {
        // Constants
		var NEXT_CARD_INSTRUCTIONS = "Press space bar to show the answer and advance to the next question.";
		
		// UI elements
        var $seeAnswerButton = $("#see-answer"),
            $nextCardButton = $("#next-card"),
            $restartButton = $("#restart-quiz"),
            $newQuizButton = $("#new-quiz"),
            $uploadButton = $("#upload-file"),
            $quizFile = $("#quiz-file"),
            $answer = $("#answer"),
			$question = $("#question"),
            $uploadFileContainer = $("#upload-file-container"),
            $quizSection = $("#quiz-section"),
			$questionNumber = $("#question-number"),
			$questionTotal = $("#question-total");

        // Global variables
        var cardSet = [],
            currentCard,
            backupCardSet;

        // Button click detection
        $seeAnswerButton.click(seeAnswer);
        $nextCardButton.click(nextCard);
        $restartButton.click(restartQuiz);
        $newQuizButton.click(reloadPage);
        $uploadButton.click(readFiles);

        // Key press detection
        $(document).on("keyup", function (event) {
            if (event.keyCode === utils.keyCodes.spacebar) {
                if (!$seeAnswerButton.hasClass("hidden")) {
                    seeAnswer();
                } else if (!$nextCardButton.hasClass("hidden")) {
                    nextCard();
                }
            }
        });

        // Helper functions
        function seeAnswer() {
            if (currentCard) {
                showNextCardButton();
                $answer.html(currentCard.answer);
            } else {
                showRestartButton();
            }
        }

        function nextCard() {
            currentCard = cardSet.pop();
            if (currentCard) {
                showSeeAnswerButton();
                $question.html(currentCard.question);
				clearAnswer();
				$questionNumber.html(parseInt($questionNumber.html()) + 1);
            } else {
                showRestartButton();
            }
        }

        function reloadPage() {
            if (!$newQuizButton.hasClass("hidden")) {
                location.reload();
            }
        }
		
		function clearAnswer() {
			$answer.html("");
		}

		function showPrompt() {
			$answer.html(NEXT_CARD_INSTRUCTIONS);
		}
		
        function showRestartButton() {
            $nextCardButton.addClass("hidden");
            $seeAnswerButton.addClass("hidden");
            $restartButton.removeClass("hidden");
            $newQuizButton.removeClass("hidden");
        }

        function showSeeAnswerButton() {
            $seeAnswerButton.removeClass("hidden");
            $nextCardButton.addClass("hidden");
            $restartButton.addClass("hidden");
            $newQuizButton.addClass("hidden");
        }

        function showNextCardButton() {
            $seeAnswerButton.addClass("hidden");
            $nextCardButton.removeClass("hidden");
            $restartButton.addClass("hidden");
            $newQuizButton.addClass("hidden");
        }

        function restartQuiz() {
            cardSet = backupCardSet.slice(0);
            startQuiz();
            showSeeAnswerButton();
			$questionNumber.html("1");
        }

        function startQuiz() {
            $restartButton.blur();
            cardSet = cardSet.shuffle();
            currentCard = cardSet.pop();
			clearAnswer();
            $question.html(currentCard.question);
			showPrompt();
        }

        function readFiles() {
            quizService.readFiles($quizFile, readFilesCallback);
        }

        function readFilesCallback(data) {
            cardSet = data;
            if (cardSet) {
                backupCardSet = cardSet.slice(0);
				$questionTotal.html(cardSet.length);
            } else {
                toastr.error("One or both of the files were empty or the files didn't contain the same number of entries.");
                return;
            }

            $uploadFileContainer.addClass("hidden");
            $quizSection.removeClass("hidden");
            startQuiz();
        }

        return this;
    }
})(jQuery, utils.quizService);