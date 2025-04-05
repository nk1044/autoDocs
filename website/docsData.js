export const data = {
    "Name": "docs for my website",
    "SideBar":[
        "Home", "Installation", "Usage" 
    ],
    "Home": {
        "Title": "Welcome to my website",
        "ASideBar": [
            "About", "Partners"
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
                            "Item 1",
                            "Item 2",
                            "Item 3"
                        ]
                    },
                    {
                        "Type": "Codeblock",
                        "Language": "python",
                        "Code": "print('Hello World')"
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
            "Requirements", "Installation Steps"
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
            "Basic Usage", "Advanced Usage"
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