import { Button } from "@/components/ui/button";

const Terms = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="w-full bg-[#0D0D0D] p-6 space-y-10 rounded-lg">
        <h1 className="text-3xl font-bold text-white">Terms & Privacy Policy</h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Welcome to Eventique! We are committed to protecting your privacy and
          ensuring a safe and enjoyable experience for all our users. This page
          outlines our policies regarding the use of our website, ticket
          refunds, and the protection of your personal information. By using
          Eventique, you agree to the terms outlined below.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Terms of Use</h2>
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-2">
            <li>
              <strong>Eligibility:</strong> You must be at least 18 years old or
              have the consent of a legal guardian to use our services.
            </li>
            <li>
              <strong>Account Responsibility:</strong> You are responsible for
              maintaining the confidentiality of your account information and all
              activities that occur under your account.
            </li>
            <li>
              <strong>Prohibited Activities:</strong> You may not use our site
              for any illegal or unauthorized purpose, including fraud, ticket
              reselling without authorization, or violating intellectual property
              rights.
            </li>
            <li>
              <strong>Event Changes:</strong> Eventique is not responsible for
              event organizer changes or cancellations, but we will notify you
              about significant updates.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            2. Ticket Refund Policy
          </h2>
          <p className="text-sm text-zinc-300 mb-2">
            We strive to make your ticket-buying experience as smooth as possible.
            Please review our refund policy below:
          </p>
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-2">
            <li>
              <strong>Refund Eligibility:</strong> Refunds are only available if
              an event is canceled or postponed. We’ll notify you and provide
              refund instructions.
            </li>
            <li>
              <strong>No Refunds for Personal Reasons:</strong> Refunds are not
              available for personal plan changes, missed events, or incorrect
              ticket purchases.
            </li>
            <li>
              <strong>Processing Time:</strong> Refunds may take up to 10
              business days depending on your payment method.
            </li>
            <li>
              <strong>Contact Us:</strong> For refund assistance, email{" "}
              <span className="text-purple-400">support@eventique.com</span>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            3. Privacy Policy
          </h2>
          <p className="text-sm text-zinc-300 mb-2">
            Your privacy is important to us. Here’s how we handle your
            information:
          </p>
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-2">
            <li>
              <strong>Information We Collect:</strong> Name, email, payment
              details, and event preferences.
            </li>
            <li>
              <strong>Usage:</strong> We process transactions, send event
              updates, and improve services. We do not sell your data.
            </li>
            <li>
              <strong>Data Security:</strong> Industry-standard encryption and
              safeguards protect your information.
            </li>
            <li>
              <strong>Cookies:</strong> Used to enhance your experience. You can
              disable cookies, but some features may not work.
            </li>
            <li>
              <strong>Third-Party Links:</strong> Eventique isn’t responsible for
              external site policies or content.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            4. Changes to This Policy
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            We may update our Privacy Policy and Terms periodically. Any changes
            will be posted here. Your continued use of Eventique after updates
            means you accept the revised terms.
          </p>
        </section>

        <div className="flex justify-end gap-4 pt-6">
          <Button className="bg-[#C14FE6] text-white hover:bg-purple-600 transform transition duration-200 hover:-translate-y-1 hover:scale-105">
            Accept
          </Button>
          <Button
            variant="outline"
            className="bg-[#0D0D0D] text-white border border-[#C14FE6] hover:bg-red-500 hover:text-white transform transition duration-200 hover:-translate-y-1 hover:scale-105"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
