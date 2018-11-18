import gulp from 'gulp';
import gls from 'gulp-live-server';
import sass from 'gulp-sass';
import coffee from 'gulp-coffee';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import clean from 'gulp-clean';
import runSequence from 'run-sequence';
import sassVariables from 'gulp-sass-variables';
import yargs from 'yargs';

const ASSETS_DIR = './public/assets/';

gulp.task('start', (cb) => {
    runSequence('clean', 'fonts', 'coffee', 'scripts', 'server', cb);
});

gulp.task('server',  _ => {
    const server = gls.new('app.js');
    server.start();
    gulp.watch('app.js', () => server.start.bind(server)());
});

gulp.task('clean', _ =>
    gulp.src(ASSETS_DIR + '*', {read: false})
        .pipe(clean())
);

gulp.task('fonts', _ =>
    gulp.src(['./node_modules/font-awesome/fonts/*', './node_modules/bootstrap-sass/assets/fonts/*'])
        .pipe(gulp.dest(ASSETS_DIR + '/fonts'))
);

gulp.task('styles', _ => {
    const sectors =  parseInt(yargs.argv.sectors);
    const radius =  parseInt(yargs.argv.radius);
    return gulp.src(['./styles/styles.scss'])
        .pipe(sassVariables({
            $sectors: sectors ? sectors : 8,
            $radius: radius ? radius : 150
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(ASSETS_DIR + 'styles/'))
});

gulp.task('coffee', _ =>
    gulp.src('./scripts/*.coffee')
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest(ASSETS_DIR + 'scripts/'))
);

gulp.task('scripts', _ =>
    gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
        './node_modules/letteringjs/jquery.lettering.js',
        './node_modules/trianglify/dist/trianglify.min.js',
        ASSETS_DIR + 'scripts/scripts.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(ASSETS_DIR + 'scripts/'))
        .pipe(uglify())
        .pipe(gulp.dest(ASSETS_DIR + 'scripts/'))
);