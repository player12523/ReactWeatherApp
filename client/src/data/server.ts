/*
import express from "express";
import path from "path";

const app = express();

const PORT = 3000;

interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    year: number;
    category: string;
    status: string;
}

const books : Book[] = [
    {
        id: 1,
        title: "British Railway Signalling",
        author: "Geoffrey Kichenside & Alan Williams",
        isbn: "978-0-7110-0898-0",
        publisher: "Ian Allan",
        year: 1963,
        category: "Signalling",
        status: "owned",
    },
    {
        id: 2,
        title: "The Settle & Carlisle Railway",
        author: "W.R. Mitchell & David Joy",
        isbn: "978-0-7117-0635-4",
        publisher: "Dalesman",
        year: 1994,
        category: "History",
        status: "owned",
    },
    {
        id: 3,
        title: "Steam Railway Photography",
        author: "Patrick B. Whitehouse",
        isbn: "978-0-7153-8319-7",
        publisher: "David & Charles",
        year: 1984,
        category: "Photography",
        status: "wishlist",
    },
    {
        id: 4,
        title: "The Great Western Railway: A History",
        author: "Andrew Roden",
        isbn: "978-1-78131-269-9",
        publisher: "Aurum Press",
        year: 2010,
        category: "History",
        status: "owned",
    },
    {
        id: 5,
        title: "Track Layout Diagrams of the GWR and BR(WR)",
        author: "R.A. Cooke",
        isbn: "978-0-9509630-0-3",
        publisher: "R.A. Cooke",
        year: 1988,
        category: "Infrastructure",
        status: "lent out",
    },
];

let nextId = 6; // tracks the next ID to assign

// Serve the homepage
app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Return all books as JSON
app.get("/api/books", (_req, res) => {
    res.json(books);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
*/