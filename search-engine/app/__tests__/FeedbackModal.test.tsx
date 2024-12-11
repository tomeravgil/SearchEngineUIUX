import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackModal from "../../components/FeedbackModal/feedback"; 
import React from "react";

describe("FeedbackModal Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    // Mock window.alert
    window.alert = jest.fn();

    // Mock fetch API
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    jest.clearAllMocks(); // Clear mocks before each test
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original implementations after each test
  });

  it("renders the modal with the correct structure", () => {
    render(<FeedbackModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("Submit Feedback")).toBeInTheDocument();
    expect(screen.getByLabelText("Label")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Text")).toBeInTheDocument();
    expect(screen.getByText("Submit Feedback")).toBeInTheDocument();
  });

  it("calls the submit API and resets form on successful submission", async () => {
    render(<FeedbackModal isOpen={true} onClose={mockOnClose} />);

    const labelInput = screen.getByLabelText("Label");
    const titleInput = screen.getByLabelText("Title");
    const textInput = screen.getByLabelText("Text");
    const submitButton = screen.getByText("Submit Feedback");

    // Fill out the form
    fireEvent.change(labelInput, { target: { value: "Bug" } });
    fireEvent.change(titleInput, { target: { value: "Error Report" } });
    fireEvent.change(textInput, { target: { value: "There is an issue with the login page." } });

    fireEvent.click(submitButton);

    // Wait for the fetch call to complete
    expect(global.fetch).toHaveBeenCalledWith(
      "http://lspt-data-eval.cs.rpi.edu:8080/v0/SubmitFeedback",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          label: "Bug",
          title: "Error Report",
          text: "There is an issue with the login page.",
        }),
      })
    );

    await screen.findByText("Feedback submitted successfully!");
    expect(window.alert).toHaveBeenCalledWith("Feedback submitted successfully!");

    // Check if the form resets
    expect(labelInput).toHaveValue("");
    expect(titleInput).toHaveValue("");
    expect(textInput).toHaveValue("");

    // Verify onClose is called
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("shows an error message on failed submission", async () => {
    // Mock fetch to simulate failure
    global.fetch.mockResolvedValueOnce({ ok: false });

    render(<FeedbackModal isOpen={true} onClose={mockOnClose} />);

    const submitButton = screen.getByText("Submit Feedback");

    fireEvent.click(submitButton);

    await screen.findByText("There was an error submitting your feedback. Please try again later.");
    expect(window.alert).toHaveBeenCalledWith("There was an error submitting your feedback. Please try again later.");
  });

  it("closes the modal when onClose is called", () => {
    render(<FeedbackModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(document.body); // Simulate clicking outside the modal
    expect(mockOnClose).toHaveBeenCalled();
  });
});


