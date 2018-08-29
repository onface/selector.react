import p from 'prop-types'
export default function (app) {
    app.defaultProps = {
        prefixClassName: 'face-selector',
        themes: '',
        options: [],
        value: []
    }
    app.propTypes = {
        prefixClassName: p.string,
        themes: p.string,
        options: p.array,
        onChange: p.func,
        value: p.array
    }
}
