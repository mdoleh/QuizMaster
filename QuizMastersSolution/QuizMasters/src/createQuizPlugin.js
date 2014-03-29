(function ($, quizService) {
    $.fn.createQuiz = function () {
        // UI elements
        var $downloadQuestionsButton = $("#download-questions"),
        $downloadAnswersButton = $("#download-answers"),
        $questionsText = $("#questions"),
        $answersText = $("#answers");

        // Adjusts tab index so that only the textboxes can be tabbed to
        $("*").attr("tabindex", -1);
        $questionsText.focus().attr("tabindex", 1);
        $answersText.attr("tabindex", 2);

        // Writes to local storage when textboxes change
        $questionsText.on("change", function () {
            localStorage.setItem("questions", $questionsText.val());
        });
        $answersText.on("change", function () {
            localStorage.setItem("answers", $answersText.val());
        });

        // Click event listeners
        $("#create-quiz > a").click(createQuestions);
        $("#download-questions > a").click(createAnswers);
        $("#download-answers").click(reloadPage);

        // Helper functions
        function createQuestions() {
            if (!checkLengths()) {
                toastr.error("The questions and answers must have the same number of entries and neither can be blank.");
                return;
            }
            $("#download-questions > a").attr("href", quizService.createFile($("#questions").val() + "\n"));
            $("#create-quiz").addClass("hidden");
            $downloadQuestionsButton.removeClass("hidden");
            $("#instructions").html("Click the button above to download the questions. You may need to add the .txt file extension at the end of the file name when saving.");
        }

        function createAnswers() {
            $("#download-answers > a").attr("href", quizService.createFile($("#answers").val() + "\n"));
            $downloadQuestionsButton.addClass("hidden");
            $downloadAnswersButton.removeClass("hidden");
            $("#instructions").html("Click the button above to download the answers. You may need to add the .txt file extension at the end of the file name when saving.");
        }

        function reloadPage() {
            if (!$downloadAnswersButton.hasClass("hidden")) {
                localStorage.removeItem("questions");
                localStorage.removeItem("answers");
                location.reload();
            }
        }

        function checkLengths() {
            var questions = $questionsText.val().split("\n");
            var answers = $answersText.val().split("\n");
            return questions.length === answers.length && questions[0] !== "" && answers[0] !== "";
        }
    }
})(jQuery, utils.quizService);