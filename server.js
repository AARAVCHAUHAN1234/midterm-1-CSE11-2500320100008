import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
app.use(express.json());
app.use(cors());

let data = [
    {
        id: 101,
        title: "Java Programming",
        author: "Herbert Schildt",
        category: "Programming",
        quantity: 5,
        available: 5
    }
];

app.post("/api/books", (req, res) => {
    try {
        const { id, title, author, category, quantity, available } = req.body;
        const newEntry = {
            id,
            title,
            author,
            category,
            quantity,
            available
        };

        data.push(newEntry);

        return res.status(201).json({
            message: "Book added successfully",
            book: newEntry
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

app.get("/api/books", (req, res) => {
    try {
        return res.status(200).json(data);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


app.get("/api/books/:id", (req, res) => {
    try {
        const id = Number(req.params.id);

        const book = data.find(book => book.id === id);

        if (!book) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        return res.status(200).json({
            message: "Book Retrieved Successfully",
            book
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


// PUT: Update a book by ID
app.put("/api/books/:id", (req, res) => {
    try {
        const id = Number(req.params.id);

        const book = data.find(book => book.id === id);

        if (!book) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        const { title, author, category, quantity, available } = req.body;

        book.title = title;
        book.author = author;
        book.category = category;
        book.quantity = quantity;
        book.available = available;

        return res.status(200).json({
            message: "Book Updated Successfully",
            book
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


