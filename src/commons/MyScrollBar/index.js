import {Menu, Icon, Drawer} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';


const {SubMenu} = Menu;


const withMyScrollBarWrap = (Comp) => {
    class NewComp extends React.Component {
        state = {
            h: window.innerHeight,
        };

        componentDidMount() {
            // type must be "resize"
            window.addEventListener('resize', this.setCurrentHeight)
        }

        componentWillUnmount() {
            // type must be "resize"
            window.removeEventListener('resize', this.setCurrentHeight)
        }

        setCurrentHeight = () => {
            this.setState({h: window.innerHeight})
        };

        renderThumb = ({style, ...props}) => {
            const thumbStyle = {
                backgroundColor: "#5b8c00",
                borderRadius: "5px"
            };
            return (
                <div
                    style={{...style, ...thumbStyle}}
                    {...props}/>
            );
        };

        render() {
            var customStyle = {height: this.state.h - 64 + 'px'};
            return (
                <Scrollbars
                    style={customStyle}
                    // renderView={this.renderView}
                    renderThumbVertical={this.renderThumb}
                >
                    <Comp {...this.props}/>
                </Scrollbars>
            )
        }
    }

    return NewComp
};

export default withMyScrollBarWrap;
