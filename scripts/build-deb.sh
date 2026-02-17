#!/bin/bash

# Configuration
PACKAGE_NAME="themenal"
VERSION="1.0.0"
ARCH="amd64"
MAINTAINER="Gabriel Soares <gabriel@example.com>"
DESCRIPTION="Terminal theme manager for Debian/Ubuntu systems"
SECTION="utils"
PRIORITY="optional"

# Preparation
BUILD_DIR="build_deb"
DEB_FILE="${PACKAGE_NAME}_${VERSION}_${ARCH}.deb"

echo "Building ${PACKAGE_NAME} v${VERSION} for ${ARCH}..."

# 1. Build the project
npm run build
npm install --production # Ensure we only have production deps for the package

# 2. Setup Debian directory structure
rm -rf ${BUILD_DIR}
mkdir -p ${BUILD_DIR}/usr/share/${PACKAGE_NAME}
mkdir -p ${BUILD_DIR}/usr/bin
mkdir -p ${BUILD_DIR}/DEBIAN

# 3. Copy files
cp -r dist ${BUILD_DIR}/usr/share/${PACKAGE_NAME}/
cp -r node_modules ${BUILD_DIR}/usr/share/${PACKAGE_NAME}/
cp package.json ${BUILD_DIR}/usr/share/${PACKAGE_NAME}/
cp -r src/themes ${BUILD_DIR}/usr/share/${PACKAGE_NAME}/ # Keep themes in a known location

# 4. Create executable wrapper
cat <<EOF > ${BUILD_DIR}/usr/bin/${PACKAGE_NAME}
#!/bin/bash
node /usr/share/${PACKAGE_NAME}/dist/cli/index.js "\$@"
EOF
chmod +x ${BUILD_DIR}/usr/bin/${PACKAGE_NAME}

# 5. Create control file
cat <<EOF > ${BUILD_DIR}/DEBIAN/control
Package: ${PACKAGE_NAME}
Version: ${VERSION}
Section: ${SECTION}
Priority: ${PRIORITY}
Architecture: ${ARCH}
Maintainer: ${MAINTAINER}
Depends: nodejs (>= 14.0.0)
Description: ${DESCRIPTION}
 Themes and colors manager for GNOME Terminal and others.
EOF

# 6. Build the package
dpkg-deb --build ${BUILD_DIR} ${DEB_FILE}

echo "Done! Package created: ${DEB_FILE}"

# 7. Reinstall the node_modules
npm install
