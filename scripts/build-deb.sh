#!/bin/bash

# Configuration
VERSION=$(node -p "require('./package.json').version")
PACKAGE_NAME="themenal"
ARCH="amd64"
MAINTAINER="Gabriel Soares <gabriel@example.com>"
DESCRIPTION="Terminal theme manager for Debian/Ubuntu systems"
SECTION="utils"
PRIORITY="optional"

# Preparation
BUILD_DIR="build_deb"
DEB_FILE="${PACKAGE_NAME}_${VERSION}_${ARCH}.deb"

echo "Building ${PACKAGE_NAME} v${VERSION} for ${ARCH}..."

# 1. Build the standalone binary
npm run build:bin

if [ ! -f "bin/themenal-bin" ]; then
    echo "Error: Binary not found. pkg might have failed."
    exit 1
fi

# 2. Setup Debian directory structure
rm -rf ${BUILD_DIR}
mkdir -p ${BUILD_DIR}/usr/bin
mkdir -p ${BUILD_DIR}/DEBIAN

# 3. Copy files
cp bin/themenal-bin ${BUILD_DIR}/usr/bin/themenal
chmod +x ${BUILD_DIR}/usr/bin/themenal

# 4. Create control file
cat <<EOF > ${BUILD_DIR}/DEBIAN/control
Package: ${PACKAGE_NAME}
Version: ${VERSION}
Section: ${SECTION}
Priority: ${PRIORITY}
Architecture: ${ARCH}
Maintainer: ${MAINTAINER}
Description: ${DESCRIPTION}
 Themes and colors manager for GNOME Terminal and others.
EOF

# 5. Build the package
dpkg-deb --build ${BUILD_DIR} ${DEB_FILE}

# 6. Cleanup
# rm -rf ${BUILD_DIR}

echo "Done! Package created: ${DEB_FILE}"
