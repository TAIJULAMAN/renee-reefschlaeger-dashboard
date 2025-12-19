import React, { useState } from 'react';
import { IoChevronBack, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { FaQuestionCircle, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const FAQ = () => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedFAQ, setSelectedFAQ] = useState(null);
    const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });
    const [editFAQ, setEditFAQ] = useState({ question: '', answer: '' });

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const [faqs, setFaqs] = useState([
        {
            id: 1,
            question: "How do I book a ride?",
            answer: "To book a ride, navigate to the Bookings page and click on 'Add Booking'. Fill in the required details including pickup location, drop-off location, date, and time. Select your preferred vehicle type and confirm your booking."
        },
        {
            id: 2,
            question: "What payment methods are accepted?",
            answer: "We accept various payment methods including credit cards, debit cards, and digital wallets. All payments are processed securely through our encrypted payment gateway."
        },
        {
            id: 3,
            question: "Can I cancel or modify my booking?",
            answer: "Yes, you can cancel or modify your booking up to 24 hours before the scheduled pickup time without any charges. For cancellations within 24 hours, a cancellation fee may apply."
        },
        {
            id: 4,
            question: "How do I track my vehicle?",
            answer: "Once your booking is confirmed, you can track your vehicle in real-time through the Bookings page. You'll receive notifications when your driver is on the way and when they arrive at your pickup location."
        },
        {
            id: 5,
            question: "What if I have issues with my driver or vehicle?",
            answer: "If you experience any issues during your trip, you can report them through the Reports page. Our support team will investigate and take appropriate action. You can also leave a review after your trip to help us improve our service."
        },
        {
            id: 6,
            question: "How are drivers verified?",
            answer: "All our drivers undergo thorough background checks, license verification, and training before they can accept bookings. We ensure they meet our safety and service standards."
        },
        {
            id: 7,
            question: "What types of vehicles are available?",
            answer: "We offer a variety of vehicles including sedans, SUVs, vans, and buses to accommodate different group sizes and preferences. You can view available vehicles on the Vehicles page."
        },
        {
            id: 8,
            question: "How do I contact customer support?",
            answer: "You can contact our customer support team through the Chat feature in the dashboard, or by submitting a report through the Reports page. Our team is available 24/7 to assist you."
        },
        {
            id: 9,
            question: "Are there any additional charges?",
            answer: "The price quoted at the time of booking includes all standard charges. Additional charges may apply for waiting time, tolls, or special requests. All charges will be clearly displayed before you confirm your booking."
        },
        {
            id: 10,
            question: "How do I update my profile information?",
            answer: "You can update your profile information by going to Settings and selecting 'Edit Profile'. Here you can change your personal details, contact information, and password."
        }
    ]);

    // Add FAQ
    const showAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleAddModalClose = () => {
        setIsAddModalOpen(false);
        setNewFAQ({ question: '', answer: '' });
    };

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setNewFAQ(prev => ({ ...prev, [name]: value }));
    };

    const handleAddFAQ = () => {
        const newId = Math.max(...faqs.map(f => f.id), 0) + 1;
        setFaqs([...faqs, { id: newId, ...newFAQ }]);
        handleAddModalClose();
    };

    // Edit FAQ
    const showEditModal = (faq) => {
        setSelectedFAQ(faq);
        setEditFAQ({ question: faq.question, answer: faq.answer });
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedFAQ(null);
        setEditFAQ({ question: '', answer: '' });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFAQ(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateFAQ = () => {
        setFaqs(faqs.map(faq =>
            faq.id === selectedFAQ.id
                ? { ...faq, question: editFAQ.question, answer: editFAQ.answer }
                : faq
        ));
        handleEditModalClose();
    };

    // Delete FAQ
    const showDeleteModal = (faq) => {
        setSelectedFAQ(faq);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setSelectedFAQ(null);
    };

    const handleDeleteFAQ = () => {
        setFaqs(faqs.filter(faq => faq.id !== selectedFAQ.id));
        handleDeleteModalClose();
    };

    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 md:px-6 py-4 md:py-5 rounded-2xl mb-5 shadow-lg">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                        aria-label="Go back"
                    >
                        <IoChevronBack className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-white text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h1>
                        </div>
                    </div>

                    {/* Add FAQ Button */}
                    <button
                        onClick={showAddModal}
                        className="hidden md:flex ml-auto items-center gap-2 px-4 py-2.5 bg-white/90 hover:bg-white text-blue-600 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        <FaPlus className="w-4 h-4" />
                        Add FAQ
                    </button>
                </div>

                {/* Mobile Add Button */}
                <div className="md:hidden mt-3">
                    <button
                        onClick={showAddModal}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/90 hover:bg-white text-blue-600 rounded-xl font-semibold transition-all duration-200"
                    >
                        <FaPlus className="w-4 h-4" />
                        Add FAQ
                    </button>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between p-4 bg-slate-50">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="flex-1 flex items-center gap-3 text-left"
                                >
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-base font-semibold text-slate-800">
                                        {faq.question}
                                    </h3>
                                    {openIndex === index ? (
                                        <IoChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0 ml-auto" />
                                    ) : (
                                        <IoChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-auto" />
                                    )}
                                </button>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 ml-3">
                                    <button
                                        className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200"
                                        onClick={() => showEditModal(faq)}
                                        title="Edit Vehicle"
                                    >
                                        <FiEdit className="text-green-600 w-5 h-5" />
                                    </button>
                                    <button
                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                        onClick={() => showDeleteModal(faq)}
                                        title="Delete Vehicle"
                                    >
                                        <FiTrash2 className="text-red-600 w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {openIndex === index && (
                                <div className="p-4 bg-white border-t border-slate-200">
                                    <p className="text-slate-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Add FAQ Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Add New FAQ</span>}
                open={isAddModalOpen}
                onCancel={handleAddModalClose}
                footer={[
                    <button
                        key="cancel"
                        onClick={handleAddModalClose}
                        className="px-4 py-2 mr-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all duration-200"
                    >
                        Cancel
                    </button>,
                    <button
                        key="submit"
                        onClick={handleAddFAQ}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                    >
                        Add FAQ
                    </button>,
                ]}
                width={600}
            >
                <div className="space-y-4 py-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Question</label>
                        <input
                            type="text"
                            name="question"
                            value={newFAQ.question}
                            onChange={handleAddInputChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your question here..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Answer</label>
                        <textarea
                            name="answer"
                            value={newFAQ.answer}
                            onChange={handleAddInputChange}
                            rows={6}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Enter the answer here..."
                        />
                    </div>
                </div>
            </Modal>

            {/* Edit FAQ Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Edit FAQ</span>}
                open={isEditModalOpen}
                onCancel={handleEditModalClose}
                footer={[
                    <button
                        key="cancel"
                        onClick={handleEditModalClose}
                        className="px-4 py-2 mr-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all duration-200"
                    >
                        Cancel
                    </button>,
                    <button
                        key="submit"
                        onClick={handleUpdateFAQ}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                    >
                        Update FAQ
                    </button>,
                ]}
                width={600}
            >
                <div className="space-y-4 py-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Question</label>
                        <input
                            type="text"
                            name="question"
                            value={editFAQ.question}
                            onChange={handleEditInputChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your question here..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Answer</label>
                        <textarea
                            name="answer"
                            value={editFAQ.answer}
                            onChange={handleEditInputChange}
                            rows={6}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            placeholder="Enter the answer here..."
                        />
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                title={<span className="text-lg font-semibold text-red-600">Delete FAQ</span>}
                open={isDeleteModalOpen}
                onCancel={handleDeleteModalClose}
                footer={[
                    <button
                        key="cancel"
                        onClick={handleDeleteModalClose}
                        className="px-4 py-2 mr-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all duration-200"
                    >
                        Cancel
                    </button>,
                    <button
                        key="delete"
                        onClick={handleDeleteFAQ}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200"
                    >
                        Delete FAQ
                    </button>,
                ]}
                width={500}
            >
                {selectedFAQ && (
                    <div className="py-4">
                        <p className="text-slate-700 mb-4">
                            Are you sure you want to delete this FAQ?
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-slate-800 mb-2">
                                <span className="text-red-600">Question:</span> {selectedFAQ.question}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Answer:</span> {selectedFAQ.answer.substring(0, 100)}...
                            </p>
                        </div>
                        <p className="text-sm text-red-600 mt-4 font-medium">
                            ⚠️ This action cannot be undone.
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default FAQ;
