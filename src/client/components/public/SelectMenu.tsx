import React from 'react';


const SelectMenu = (props: any) => {
    let tags = props.tags.map((tag: Tag) => {
        return (
            <option key={tag.id} value={tag.name}>{tag.name}</option>
        );
    });

    return (
        <React.Fragment>
            <option value="">Select a tag...</option>
            {tags}
        </React.Fragment>
    );
};


interface Tag {
    id: number;
    name: string;
}



export default SelectMenu;

