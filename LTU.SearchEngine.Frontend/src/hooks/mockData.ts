import type { SearchResponse } from '../models/SearchInterface';

export const mockSearchResults: SearchResponse = {
    results: [
        {
            title: "Benefits",
            url: "https://www.ltu.se/en/about-the-university/work-with-us/benefits",
            snippet: "Luleå University of Technology has generous <strong>benefits</strong> when it comes to working hours, <strong>flex time</strong> and vacation."
        },
        {
            title: "University Library - LTU",
            url: "https://www.ltu.se/en/university-library",
            snippet: "Search for books, journals and <strong>databases</strong>. The <strong>library</strong> offers support for students and researchers at <strong>Luleå</strong> University."
        },
        {
            title: "Computer Science and IT",
            url: "https://www.ltu.se/en/education/our-courses/computer-science-and-it?listType=course&educationType=%5B%22Course%22%5D&courseType=%5B%22Freestanding+course+%28En%29%22%5D",
            snippet: "We offer a variety of courses for those who realize that the need for <strong>data</strong> and <strong>information technology</strong> is a requirement."
        },
        {
            title: "Research at LTU - Excellence in Innovation",
            url: "https://www.ltu.se/en/research",
            snippet: "Our <strong>research</strong> is conducted in close collaboration with industry. We focus on <strong>sustainability</strong> and green transition."
        },
        {
            title: "Student Health Service",
            url: "https://www.ltu.se/en/student-web/support-during-your-studies/student-health-service",
            snippet: "The <strong>student</strong> health service offers support for your <strong>well-being</strong>. We provide counseling and healthcare advice."
        },
        {
            title: "Career and future",
            url: "https://www.ltu.se/en/student-web/career-and-future",
            snippet: "As a student at <strong>Luleå University of Technology</strong>, you get access to <strong>career</strong> support, inspiration and networking."
        },
        {
            title: "Department of Computer Science, Electrical and Space Engineering",
            url: "https://www.ltu.se/en/org/srt",
            snippet: "Explore our <strong>engineering</strong> programs and <strong>space</strong> research. We are leading the way in <strong>AI</strong> and robotics."
        },
        {
            title: "Piteå School of Music",
            url: "https://www.ltu.se/en/org/ksm",
            snippet: "Study <strong>music</strong> and media in <strong>Piteå</strong>. Our campus offers world-class <strong>studios</strong> for creative arts."
        },
        {
            title: "International Exchange Studies",
            url: "https://www.ltu.se/en/student/exchange",
            snippet: "Apply for <strong>exchange</strong> programs and study <strong>abroad</strong>. <strong>LTU</strong> has partner universities all over the world."
        },
        {
            title: "Innovation and E-commerce",
            url: "https://www.ltu.se/en/edu/courses/d7012e",
            snippet: "A course focusing on <strong>digital</strong> business models and <strong>innovation</strong> in the modern market."
        },
        {
            title: "Campus Luleå - Virtual Tour",
            url: "https://www.ltu.se/en/about-ltu/visit-us/campus-lulea",
            snippet: "Experience <strong>Campus</strong> Luleå through our <strong>virtual</strong> tour. See our labs, lecture halls and <strong>student</strong> areas."
        },
        {
            title: "Doctoral Studies at LTU",
            url: "https://www.ltu.se/en/research/phd-studies",
            snippet: "Become a <strong>PhD</strong> student and contribute to <strong>science</strong>. We offer fully funded positions in various research subjects."
        },
        {
            title: "LTU Business - Strategic Consulting",
            url: "https://ltubusiness.se/",
            snippet: "We turn <strong>research</strong> into <strong>business</strong>. LTU Business helps innovators reach the global market."
        }
    ],
    totalResults: 13, // För att testa pagination vid > 10 resultat (FRQ-3012) 
    currentPage: 1,
    pageSize: 10,
    totalPages: 2
};