import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

const Faqs = () => {
  const faqItems = [
    {
      question: "What is CTMIS and how does it work?",
      answer:
        "CTMIS (Computerized Transport Management Information System) is a digital platform that allows users to book rides, rent cars, and report or claim lost items. Simply sign up, choose your service, and enjoy a seamless transportation experience.",
    },
    {
      question: "How do I book a ride?",
      answer:
        "To book a ride, go to the Book a Ride page, enter your pickup location, destination, and preferred ride type, then confirm your booking. You will receive a ride confirmation instantly.",
    },
    {
      question: "Can I schedule a ride in advance?",
      answer:
        "Yes! You can schedule a ride by selecting a future date and time when booking. A driver will be assigned before your scheduled time.",
    },
    {
      question: "How does the car rental feature work?",
      answer: `To rent a car, visit the "Rent a Car" page, browse available cars, select your preferred car, choose the rental duration, and complete the booking.`,
    },
    {
      question: "What should I do if I lose an item in a ride?",
      answer: `If you lose an item during a ride, visit the "Lost & Found" page and submit a report with details of the lost item, including the date, time, and ride details. We will notify you if your item is found.`,
    },
    {
      question: "How can I report a found item?",
      answer: `If you find a lost item, you can report it on the "Lost & Found" page by providing a description and where you found it. The rightful owner will be contacted to claim it.`,
    },
    {
      question: "Do I need an account to use CTMIS?",
      answer:
        "Yes, you need an account to book rides, rent cars, and report lost items. However, you can browse available services without an account.",
    },

    {
      question: " Is there customer support available?",
      answer: `Yes! If you have any issues, you can send us a message using the contact form or contact us via email, phone, or live chat for assistance.`,
    },

    {
      question: " How do I cancel a ride or car rental?",
      answer:
        "You can cancel a ride or rental through your dashboard before the scheduled time. Cancellation fees may apply depending on the timing.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const initialFormData = {
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    organizationType: "",
    fleetSize: "",
    managementSystem: "",
    contactMethod: "",
    urgency: "",
    comment: "",
    agreeToPolicy: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [submit, setSubmit] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    setFormData(initialFormData);
  };

  useEffect(() => {
    if (submit) {
      const timer = setTimeout(() => {
        setSubmit(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submit]);

  return (
    <>
      <section className="my-10">
        <div className="container mx-auto w-full md:w-8/12 lg:w-10/12 px-4">
          <h1 className="font-bold text-[2rem] mt-6 md:mt-0 md:text-[3rem] text-center my-5">
            CTMIS Business FAQs
          </h1>
          <div className="text-justify w-8/12 mx-auto">
            <p className="my-2">
              Welcome to CTMIS, Yyur Smart Transportation Companion! At CTMIS we
              aim to simplify and enhance your intercity travel experience using
              modern digital solutions. Below are answers to some frequently
              asked questions to help you understand how CTMIS works and how it
              benefits you
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto w-full md:w-8/12 lg:w-10/12 px-4">
          <div className="w-full mx-auto py-4">
            {faqItems.map((item, index) => (
              <div key={index}>
                <button
                  className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-800 hover:text-gray-900"
                  onClick={() => toggleItem(index)}
                >
                  {item.question}
                  {openIndex === index ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>
                {openIndex === index && (
                  <div className="py-2 text-gray-600">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mb-20 mt-10">
        <div className="container mx-auto w-full md:w-8/12 lg:w-10/12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10">
            <div>
              <h1 className="font-bold text-[2rem] mt-6 md:mt-0 md:text-[3rem]  my-3">
                Contact Us
              </h1>
              <p className="text-justify">
                We’d love to hear from you! Whether you have questions about our
                Computerized Transport Management Information System (CTMIS),
                need a demo, or require support, our team is here to help. Fill
                out the form, and one of our representatives will get back to
                you as soon as possible.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              {submit ? (
                <div className="text-center text-green-600 font-semibold">
                  Your request has been received!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-medium">Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">
                      Job Title / Company Name*
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded-md"
                      placeholder="Your position or company name"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded-md"
                      placeholder="example@company.com"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Phone Number*</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded-md"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">
                      Current Transport System Used
                    </label>
                    <input
                      type="text"
                      name="managementSystem"
                      value={formData.managementSystem}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="e.g.Uber, Bolt, Indrive"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">
                      Urgency of Request
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select urgency level</option>
                      <option value="low">Low (General Inquiry)</option>
                      <option value="medium">
                        Medium (Needs Assistance Soon)
                      </option>
                      <option value="high">
                        High (Immediate Attention Required)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium">Message</label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      rows="4"
                      placeholder="Add any additional details here"
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="agreeToPolicy"
                      checked={formData.agreeToPolicy}
                      onChange={handleChange}
                      className="mr-2"
                      required
                    />
                    <label>
                      I accept the{" "}
                      <a href="#" className="text-blue-600 underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
                    >
                      Send Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faqs;
