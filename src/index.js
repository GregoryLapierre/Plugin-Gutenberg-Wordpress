import { useBlockProps } from "@wordpress/block-editor";

(function (blocks, element, editor) {
    const el = element.createElement;
    const { registerBlockType } = blocks;
    const { RichText } = editor;

    registerBlockType('nouveau-bloc/mon-bloc', {

        title: 'Mon Premier Bloc',

        icon: 'smiley',

        category: 'design',

        attributes: {
            content: {
                type: 'string',
                source: 'html',
                selector: '.alertContent'
            },
            option: {
                type: 'string',
            },
        },

        edit: function (props) {
            function onChangeOption(newOption) {
                props.setAttributes({ option: newOption.target.value });
                console.log(newOption.target.value)

            }
            function onChangeContent(newContent) {
                props.setAttributes({ content: newContent });
                console.log(props.setAttributes({ content: newContent }))
            }
            return (
                el('div', { className: 'alert alert-dismissible alert-' + props.attributes.option, role: 'alert' },
                    el('select', {
                        name: 'option-select',
                        id: 'option-select',
                        onChange: onChangeOption,
                    },
                        el('option', {}, 'Choisir une option'),
                        el('option', { value: 'primary' }, 'Primary'),
                        el('option', { value: 'secondary' }, 'Secondary'),
                        el('option', { value: 'success' }, 'Success'),
                        el('option', { value: 'danger' }, 'Danger'),
                        el('option', { value: 'warning' }, 'Warning'),
                        el('option', { value: 'info' }, 'Info'),
                        el('option', { value: 'light' }, 'Light'),
                        el('option', { value: 'dark' }, 'Dark'),
                    ),
                    el(
                        RichText,
                        {
                            format: 'string',
                            onChange: onChangeContent,
                            value: props.attributes.content,
                            formattingControls: ['bold'],
                            className: 'alertContent'
                        }
                    )
                )
            )
        },
        
        save: function (props) {
            const blockProps = useBlockProps.save();
            return (
                <div
                    {...blockProps}
                    className={"alert alert-dismissible alert-" + props.attributes.option}
                    role="alert"
                >
                    <RichText.Content
                        tagName="div"
                        value={props.attributes.content}
                        className="alertContent"
                    />
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
            );
        },

    });
})(
    window.wp.blocks,
    window.wp.element,
    window.wp.editor,
);
