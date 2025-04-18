export const data = {
    "Name": "docs for my website",
    "SideBar":[
        "Home", "Installation", "Usage" 
    ],
    "Home": {
        "Title": "Welcome to my website",
        "ASideBar": [
            {"Title":"About",
            "ID": 1
            },
            {"Title":"Partners",
            "ID": 2
            }
        ],
        "Data": [
            {
                "ID": 1,
                "Heading": "About",
                "Children": [
                    {
                        "Type": "Paragraph",
                        "Text": "This is a paragraph in the about section. data in this content is in markdown format"
                    },
                    {
                        "Type": "List",
                        "Text": "heading for list",
                        "Items": [
                            "[bold]Item 1[/bold]",
                            "[code]Item 2[/code]",
                            "[link]Item 3(#)[/link]"
                        ]
                    },
                    {
                        "Type": "Codeblock",
                        "Language": "python",
                        "Code": "print('Hello World, test code')"
                    },
                    {
                        "Type": "Table",
                        "Title": "Table Title",
                        "Headers": ["Header 1", "Header 2", "Header 3"],
                        "Rows": [
                            ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
                            ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
                            ["Row 3 Col 1", "Row 3 Col 2", "Row 3 Col 3"]
                        ]
                    }
                ]
            },
            {
                "ID": 2,
                "Heading": "Partners",
                "Children": []
            }
        ]
    },
    "Installation": {
        "Title": "Installation",
        "ASideBar": [
        {"Title":"Requirements",
        "ID": 1
        },
        {"Title":"Installation Steps",
        "ID": 2
        }
        ],
        "Data": [
            {
                "ID": 1,
                "Heading": "Requirements",
                "Children": [
                    {
                        "Type": "Paragraph",
                        "Text": "This is a paragraph in the requirements section. data in this content is in markdown format"
                    }
                ]
            },
            {
                "ID": 2,
                "Heading": "Installation Steps",
                "Children": []
            }
        ]
    },
    "Usage": {
        "Title": "Usage",
        "ASideBar": [
            {"Title":"Basic Usage",
            "ID": 1
            },
            {"Title":"Advanced Usage",
            "ID": 2
            }
        ],
        "Data": [
            {
                "ID": 1,
                "Heading": "Basic Usage",
                "Children": [
                    {
                        "Type": "Paragraph",
                        "Text": "This is a paragraph in the basic usage section. data in this content is in markdown format"
                    }
                ]
            },
            {
                "ID": 2,
                "Heading": "Advanced Usage",
                "Children": []
            }
        ]
    }
}