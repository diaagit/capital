"use client";

import { useState, FC } from "react";
import { CircleHelp, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Eventique and how does it prevent ticket fraud?",
    answer:
      "Eventique is a next-generation ticketing platform that utilizes blockchain technology to create immutable, traceable tickets. Each ticket is a unique digital asset, making it nearly impossible to counterfeit or scalp, ensuring a fair and secure experience for all attendees.",
  },
  {
    question: "Can I resell my ticket if I can't attend an event?",
    answer:
      "Yes, our platform allows for secure and verified ticket resale through our official marketplace. All transactions are recorded on the blockchain, guaranteeing the authenticity of the ticket for the new buyer and preventing price gouging by capping resale prices.",
  },
  {
    question: "What types of events can I find on Eventique?",
    answer:
      "Eventique offers a wide variety of events, including concerts, music festivals, sporting events, theater shows, and more. Our platform partners with top artists and organizers to bring you exclusive access to the most popular events.",
  },
  {
    question: "How do I receive my tickets after purchase?",
    answer:
      "Your tickets are delivered instantly to your digital wallet within the Eventique app. They are stored securely and can be accessed anytime. Simply present the QR code from your app at the venue for seamless entry.",
  },
  {
    question: "What happens if an event is canceled or postponed?",
    answer:
      "In the case of a cancellation, you will automatically receive a full refund to your original payment method. For postponed events, your tickets will be valid for the new date. We will keep you informed via email and in-app notifications.",
  },
];

const FAQ: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto bg-[#0D0D0D] text-white mt-40 pb-30">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-white">
            Frequently Asked <span className="text-[#D580F2]">Questions</span>
          </h1>
          <p className="text-xl text-[#999999]">
            Explore the most common questions and detailed answers about our
            events or concerts, and security to help guide your journey in the
            EVENTIQUE.
          </p>
        </div>

        <div className="mt-12">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg transition-all duration-300 bg-[#1B1B1B]"
              >

                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-base flex gap-2 font-semibold">
                    <CircleHelp />
                    {faq.question}
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    {openFaq === index ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFaq === index ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-[#999999]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
