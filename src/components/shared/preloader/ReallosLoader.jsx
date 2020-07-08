import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as RStrokeLogo } from '../../../assets/reallos-r-stroke.svg';
import { ReactComponent as ReallosStrokeLogo } from '../../../assets/reallos-stroke.svg';
import './ReallosLoader.css';

/**
 * Display a preloader with backdrop overlay.
 * @augments {React.Component<Props>}
 */
class ReallosLoaderWithOverlay extends React.Component {
    static propTypes = {
        /**
         * Specify whether the preloader is visible.
         */
        visible: PropTypes.bool.isRequired,

        /**
         * Specify the size of preloader.
         *
         * (_Default: 380 for full logo | 90 for short logo_)
         */
        size: PropTypes.number,

        /**
         * Specify the background color to be applied.
         * 
         * (_Default: rgba(0, 0, 0, 0.25) | "#00000040"_)
         */
        backgroundColor: PropTypes.string,

        /**
         * Specify the stroke color of preloader.
         * 
         * (_Default: rgb(21, 5, 120) | "#150578"_)
         */
        strokeColor: PropTypes.string,

        /**
         * Specify the stroke width of preloader.
         * 
         * (_Default: 3_)
         */
        strokeWidth: PropTypes.number,

        /**
         * Remove backdrop blur effect when rendering the
         * preloader. You might want to disable the blur
         * effect for performance reasons.
         *
         * (_Default: false_)
         */
        disableBackdropBlur: PropTypes.bool,

        /**
         * Specify whether to show a full logo or short logo.
         *
         * (_Default: true_)
         */
        shouldUseFullLogo: PropTypes.bool
    }

    render() {
        let {
            visible,
            size,
            backgroundColor,
            strokeColor,
            strokeWidth,
            disableBackdropBlur=false,
            shouldUseFullLogo=true,
            children
        } = this.props;

        return (
            <div className="reallos-preloader-root" visible={visible.toString()}>
                <div
                    className={`reallos-backdrop ${disableBackdropBlur ? 'backdrop-no-blur' : ''}`}
                    style={{ backgroundColor }}
                ></div>
                <ReallosLoader
                    size={size}
                    strokeColor={strokeColor}
                    strokeWidth={strokeWidth}
                    shouldUseFullLogo={shouldUseFullLogo}
                />

                {children}
            </div>
        )
    }
}

/**
 * Display a preloader
 * @augments {React.Component<Props>}
 */
class ReallosLoader extends React.Component {
    static propTypes = {
        /**
         * Specify the size of preloader.
         *
         * (_Default: 380 for full logo | 90 for short logo_)
         */
        size: PropTypes.number,

        /**
         * Specify the stroke color of preloader.
         * 
         * (_Default: rgb(21, 5, 120) | "#150578"_)
         */
        strokeColor: PropTypes.string,

        /**
         * Specify the stroke width of preloader.
         * 
         * (_Default: 3_)
         */
        strokeWidth: PropTypes.number,

        /**
         * Specify whether to show a full logo or short logo.
         *
         * (_Default: true_)
         */
        shouldUseFullLogo: PropTypes.bool
    }

    render() {
        let {
            size,
            strokeColor,
            strokeWidth,
            shouldUseFullLogo=true,
        } = this.props;

        const style = {
            width: size,
            stroke: strokeColor,
            strokeWidth: strokeWidth
        }

        return (
            <div className="r-logo-container">
                {shouldUseFullLogo
                    ? <ReallosStrokeLogo full-logo="true" style={style} />
                    : <RStrokeLogo style={style} />
                }
            </div>
        )
    }
}

export default ReallosLoader;
export { ReallosLoaderWithOverlay };
